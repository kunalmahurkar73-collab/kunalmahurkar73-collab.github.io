(function(){
  const links=window.amazonCheckoutLinks||{};
  const items=[['prototype','Explore Interactive Prototype'],['presentation','View UX Presentation'],['walkthrough','Watch 5-Minute Walkthrough']];
  const container=document.getElementById('project-actions');
  for(const [key,label] of items){
    const url=links[key];
    const el=document.createElement(url?'a':'span');
    el.textContent=url?label:`${label} — coming soon`;
    if(url){
      el.href=url;
      if(new URL(url,location.href).origin!==location.origin){el.rel='noopener noreferrer';el.target='_blank';}
    }
    container.append(el);
  }
})();
