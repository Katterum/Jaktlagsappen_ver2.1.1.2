(function(){
 const c=window.KATTERUMS_CLOUD_CONFIG||{};
 const ready=window.supabase&&c.url&&c.publishableKey&&!c.publishableKey.startsWith('PASTE_');
 const client=ready?window.supabase.createClient(c.url,c.publishableKey,{auth:{persistSession:true,autoRefreshToken:true}}):null;
 async function login(username,password){
  if(!client)return {ok:false,error:'Supabase är inte konfigurerat.'};
  try{
   const {data,error}=await client.functions.invoke('username-login',{body:{username,password,teamId:c.teamId}});
   if(error||!data?.access_token)return {ok:false,error:data?.error||error?.message||'Fel användarnamn eller lösenord.'};
   const {error:sessionError}=await client.auth.setSession({access_token:data.access_token,refresh_token:data.refresh_token});
   if(sessionError)return {ok:false,error:'Sessionen kunde inte startas.'};
   return {ok:true,user:{memberId:String(data.member_id),role:data.role,userId:data.user_id}};
  }catch(e){return {ok:false,error:e.message||'Inloggningen misslyckades.'}}
 }
 window.KatterumsCloud={client,login};
})();
