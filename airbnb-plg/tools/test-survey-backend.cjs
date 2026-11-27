/* Backend logic tests with mocked providers; not a live integration test. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const source=fs.readFileSync(path.join(__dirname,'../backend/worker.js'),'utf8');
 const {default:worker,validatePayload}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
 const payload={id:'7689e241-68a7-469a-8b80-ed98d46c8367',role:'host',consent:true,website:'',elapsedMs:60000,turnstileToken:'mock-token',answers:{role:'host',city:'Pune',propertyType:'Villa',experience:'1–3 years',occupancyChallenge:'Weekday gaps',pricingChallenge:'Seasonal price decisions',readiness:'Mostly prepared',recommendationDemand:'Somewhat useful',recommendationAction:'Clear explanation',feedback:''}};
 assert.equal(validatePayload(payload),true);
 assert.equal(validatePayload({...payload,consent:false}),false);
 assert.equal(validatePayload({...payload,website:'spam.example'}),false);
 assert.equal(validatePayload({...payload,elapsedMs:100}),false);
 assert.equal(validatePayload({...payload,answers:{...payload.answers,readiness:'invented'}}),false);
 assert.equal(validatePayload({...payload,answers:{...payload.answers,operations:['None','Cleaning coordination']}}),false);
 const env={ALLOWED_ORIGINS:'https://kunalmahurkar.is-a.dev',TURNSTILE_HOSTNAME:'kunalmahurkar.is-a.dev',SUPABASE_URL:'https://mock.supabase.co',SUPABASE_SERVICE_ROLE_KEY:'not-a-real-key',TURNSTILE_SECRET:'not-a-real-secret',RATE_HASH_SECRET:'not-a-real-test-secret-at-least-thirty-two'};
 const request=(p=payload,origin='https://kunalmahurkar.is-a.dev')=>new Request('https://research.example/submit',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin,'CF-Connecting-IP':'192.0.2.1'},body:JSON.stringify(p)});
 let calls=[];global.fetch=async(url,init)=>{calls.push([url,init]);return new Response(JSON.stringify(String(url).includes('siteverify')?{success:true,hostname:env.TURNSTILE_HOSTNAME}:true));};
 let result=await worker.fetch(request(),env);assert.equal(result.status,200);assert.deepEqual(await result.json(),{saved:true});assert.equal(calls.length,2);
 const rpc=JSON.parse(calls[1][1].body);assert.equal(rpc.p_rate_hash.length,64);assert.equal(rpc.p_rate_hash.includes('192.0.2.1'),false);assert.equal(rpc.p_answers.role,'host');
 calls=[];result=await worker.fetch(request(payload,'https://evil.example'),env);assert.equal(result.status,403);assert.equal(calls.length,0);
 result=await worker.fetch(request(),{});assert.equal(result.status,503);
 global.fetch=async()=>new Response(JSON.stringify({success:true,hostname:'wrong.example'}));result=await worker.fetch(request(),env);assert.equal(result.status,403);
 global.fetch=async(url)=>new Response(JSON.stringify(String(url).includes('siteverify')?{success:true,hostname:env.TURNSTILE_HOSTNAME}:false));result=await worker.fetch(request(),env);assert.equal(result.status,429);
 result=await worker.fetch(request({...payload,answers:{...payload.answers,feedback:'x'.repeat(17000)}}),env);assert.equal(result.status,413);
 const rows={};global.window=rows;require('node:vm').runInThisContext(fs.readFileSync(path.join(__dirname,'../data.js'),'utf8'));const d=window.STUDY_DATA;
 assert.equal(d.travellers.length,100);assert.equal(d.hosts.length,20);assert.equal(d.interviews.length,12);
 for(const [p,n]of Object.entries({coordination:68,trust:61,budget:57,totalCost:54,dates:48,activities:32}))assert.equal(d.travellers.filter(t=>t.painPoints.includes(p)).length,n);
 console.log('PASS: survey server validation, configured/unconfigured behavior, provider mock success, CORS origin rejection, Turnstile hostname rejection, request bound, atomic-limit response, dataset totals and six exact pain distributions. Provider calls mocked; SQL and live submission not executed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
