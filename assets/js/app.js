const $=id=>document.getElementById(id);
const SAMPLE=`local Gui = Instance.new("ScreenGui")
Gui.Name = "LuaGui"
Gui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

local Main = Instance.new("Frame")
Main.Name = "Main"
Main.Size = UDim2.new(0, 380, 0, 230)
Main.Position = UDim2.new(0.5, 0, 0.5, 0)
Main.AnchorPoint = Vector2.new(0.5, 0.5)
Main.BackgroundColor3 = Color3.fromRGB(10, 24, 16)
Main.BorderSizePixel = 0
Main.Parent = Gui

local Corner = Instance.new("UICorner")
Corner.CornerRadius = UDim.new(0, 16)
Corner.Parent = Main

local Stroke = Instance.new("UIStroke")
Stroke.Color = Color3.fromRGB(47, 166, 106)
Stroke.Thickness = 2
Stroke.Parent = Main

local Title = Instance.new("TextLabel")
Title.Size = UDim2.new(1, -40, 0, 50)
Title.Position = UDim2.new(0, 20, 0, 16)
Title.BackgroundTransparency = 1
Title.Text = "Lua 2 Gui"
Title.Font = Enum.Font.GothamBold
Title.TextSize = 30
Title.TextColor3 = Color3.fromRGB(234, 223, 198)
Title.TextXAlignment = Enum.TextXAlignment.Left
Title.Parent = Main

local Sub = Instance.new("TextLabel")
Sub.Size = UDim2.new(1, -40, 0, 40)
Sub.Position = UDim2.new(0, 20, 0, 70)
Sub.BackgroundTransparency = 1
Sub.Text = "Your interface, straight from code."
Sub.Font = Enum.Font.Gotham
Sub.TextSize = 16
Sub.TextColor3 = Color3.fromRGB(168, 240, 191)
Sub.TextXAlignment = Enum.TextXAlignment.Left
Sub.Parent = Main

local Btn = Instance.new("TextButton")
Btn.Size = UDim2.new(0, 160, 0, 46)
Btn.Position = UDim2.new(0, 20, 1, -66)
Btn.BackgroundColor3 = Color3.fromRGB(47, 166, 106)
Btn.BorderSizePixel = 0
Btn.Text = "Get started"
Btn.Font = Enum.Font.GothamBold
Btn.TextSize = 18
Btn.TextColor3 = Color3.fromRGB(255, 255, 255)
Btn.Parent = Main

local BtnCorner = Instance.new("UICorner")
BtnCorner.CornerRadius = UDim.new(0, 12)
BtnCorner.Parent = Btn
`;
const T={Image:'c',ZIndex:'i',BorderSizePixel:'i',LayoutOrder:'i',TextSize:'i',MaxVisibleGraphemes:'i',DisplayOrder:'i',TabIndex:'i'};
const E={
Font:{Legacy:0,Arial:1,ArialBold:2,SourceSans:3,SourceSansBold:4,SourceSansLight:5,SourceSansItalic:6,Bodoni:7,Garamond:8,Cartoon:9,Code:10,Highway:11,SciFi:12,Arcade:13,Fantasy:14,Antique:15,SourceSansSemibold:16,Gotham:17,GothamMedium:18,GothamSemibold:18,GothamBold:19,GothamBlack:20,AmaticSC:21,Bangers:22,Creepster:23,FredokaOne:26,LuckiestGuy:32,Nunito:35,Oswald:36,PermanentMarker:38,Roboto:39,RobotoMono:41,Ubuntu:45},
TextXAlignment:{Left:0,Right:1,Center:2},TextYAlignment:{Top:0,Center:1,Bottom:2},
FillDirection:{Horizontal:0,Vertical:1},HorizontalAlignment:{Center:0,Left:1,Right:2},VerticalAlignment:{Center:0,Top:1,Bottom:2},
SortOrder:{Name:0,Custom:1,LayoutOrder:2},ScaleType:{Stretch:0,Slice:1,Tile:2,Fit:3,Crop:4},ZIndexBehavior:{Global:0,Sibling:1},
ApplyStrokeMode:{Contextual:0,Border:1},BorderMode:{Outline:0,Middle:1,Inset:2}};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

/* ---------- leitura do Lua ---------- */
function stmts(src){
  const out=[];let cur='',depth=0,quote=null,longEnd=null,skipLong=false;
  for(let i=0;i<src.length;i++){
    const ch=src[i],next=src[i+1]||'';
    if(longEnd){
      if(src.startsWith(longEnd,i)){if(!skipLong)cur+=longEnd;i+=longEnd.length-1;longEnd=null;skipLong=false;}
      else if(!skipLong)cur+=ch;
      continue;
    }
    if(quote){
      cur+=ch;
      if(ch==='\\'&&i+1<src.length){cur+=src[++i];continue;}
      if(ch===quote)quote=null;
      continue;
    }
    if(ch==='-'&&next==='-'){
      const lm=src.slice(i+2).match(/^\[(=*)\[/);
      if(lm){const opener='['+lm[1]+'[';longEnd=']'+lm[1]+']';skipLong=true;i+=2+opener.length-1;}
      else{while(i<src.length&&src[i]!=='\n')i++;if(depth===0){if(cur.trim())out.push(cur.trim());cur='';}}
      continue;
    }
    if(ch==='['){
      const lm=src.slice(i).match(/^\[(=*)\[/);
      if(lm){const opener='['+lm[1]+'[';cur+=opener;i+=opener.length-1;longEnd=']'+lm[1]+']';continue;}
    }
    if(ch==='"'||ch==="'"){quote=ch;cur+=ch;continue;}
    if('({['.includes(ch))depth++;
    if(')}]'.includes(ch))depth=Math.max(0,depth-1);
    if((ch==='\n'||ch===';')&&depth===0){if(cur.trim())out.push(cur.trim());cur='';continue;}
    cur+=ch;
  }
  if(cur.trim())out.push(cur.trim());
  return out;
}
function args(s){
  const a=[];let c='',d=0,q=null;
  for(const ch of s){
    if(q){c+=ch;if(ch===q)q=null;continue}
    if(ch==='"'||ch==="'"){q=ch;c+=ch;continue}
    if(ch==='(')d++;
    if(ch===')')d--;
    if(ch===','&&d===0){a.push(c.trim());c='';continue}
    c+=ch;
  }
  if(c.trim())a.push(c.trim());
  return a;
}
function num(s){
  const t=String(s).trim();
  if(!t || !/^[\d.eE+\-*/()\s]+$/.test(t)) return NaN;
  // Only allow numeric arithmetic; no eval/Function and no access to page globals.
  const tokens=t.match(/(?:\d+(?:\.\d*)?|\.\d+)(?:e[+\-]?\d+)?|[()+*/\-]/gi);
  if(!tokens || tokens.join('').replace(/\s/g,'')!==t.replace(/\s/g,'')) return NaN;
  let i=0;
  function expr(){let v=term();while(tokens[i]==='+'||tokens[i]==='-'){const op=tokens[i++],r=term();v=op==='+'?v+r:v-r;}return v;}
  function term(){let v=factor();while(tokens[i]==='*'||tokens[i]==='/'){const op=tokens[i++],r=factor();if(op==='/'&&r===0)throw Error('division by zero');v=op==='*'?v*r:v/r;}return v;}
  function factor(){if(tokens[i]==='+'){i++;return factor();}if(tokens[i]==='-'){i++;return -factor();}if(tokens[i]==='('){i++;const v=expr();if(tokens[i++]!==')')throw Error('parenthesis');return v;}const v=Number(tokens[i++]);if(!Number.isFinite(v))throw Error('number');return v;}
  try{const v=expr();return i===tokens.length&&Number.isFinite(v)?v:NaN;}catch(e){return NaN;}
}
function val(s){
  s=s.trim();let m;
  if(m=s.match(/^\[(=*)\[([\s\S]*)\]\1\]$/))return{t:'p',v:m[2]};
  if(m=s.match(/^(["'])([\s\S]*)\1$/))return{t:'s',v:m[2]};
  if(s==='true'||s==='false')return{t:'b',v:s==='true'};
  if(m=s.match(/^Color3\.fromHex\(([\s\S]*)\)$/)){
    const h=args(m[1])[0]?.replace(/["' #]/g,'');
    if(h&&/^[0-9a-fA-F]{6}$/.test(h))return{t:'Color3',v:[0,2,4].map(i=>parseInt(h.slice(i,i+2),16)/255)};
  }
  if(m=s.match(/^(UDim2|UDim|Vector2|Color3)\.(\w+)\(([\s\S]*)\)$/)){
    const a=args(m[3]).map(num);
    if(a.some(isNaN))return null;
    const k=m[1],f=m[2];
    if(k==='UDim2'){
      if(f==='new'&&a.length===4)return{t:'UDim2',v:a};
      if(f==='fromScale'&&a.length===2)return{t:'UDim2',v:[a[0],0,a[1],0]};
      if(f==='fromOffset'&&a.length===2)return{t:'UDim2',v:[0,a[0],0,a[1]]};
    }
    if(k==='UDim'&&f==='new')return{t:'UDim',v:[a[0]||0,a[1]||0]};
    if(k==='Vector2'&&f==='new')return{t:'Vector2',v:[a[0]||0,a[1]||0]};
    if(k==='Color3'){
      if(f==='fromRGB'&&a.length===3)return{t:'Color3',v:a.map(x=>x/255)};
      if(f==='new')return{t:'Color3',v:[a[0]||0,a[1]||0,a[2]||0]};
      if(f==='fromHex'&&args(m[3]).length===1){const h=args(m[3])[0].replace(/["' #]/g,'');if(/^[0-9a-fA-F]{6}$/.test(h))return{t:'Color3',v:[0,2,4].map(i=>parseInt(h.slice(i,i+2),16)/255)};}
    }
    return null;
  }
  if(m=s.match(/^Enum\.(\w+)\.(\w+)$/))return{t:'e',en:m[1],v:m[2]};
  const n=num(s);
  return isNaN(n)?null:{t:'n',v:n};
}
function build(src){
  const vars={},all=[],warn=[];
  for(const st of stmts(src)){
    let m=st.match(/^(?:local\s+)?(\w+)\s*=\s*Instance\.new\(\s*["'](\w+)["']\s*(?:,\s*([\s\S]+?))?\s*\)$/);
    if(m){if(vars[m[1]])warn.push('Duplicate variable name: '+m[1]+' (the later Instance.new replaces the earlier reference)');const n={cls:m[2],vn:m[1],props:{},kids:[],pref:m[3]?m[3].trim():null};vars[m[1]]=n;all.push(n);continue}
    m=st.match(/^(\w+)\.(\w+)\s*=\s*([\s\S]+)$/);
    if(m&&vars[m[1]]){
      const n=vars[m[1]];
      if(m[2]==='Parent')n.pref=m[3].trim();
      else{const v=val(m[3]);if(v){if(v.t==='e'&&!(E[v.en]&&E[v.en][v.v]!=null))warn.push('Enum not mapped for export: '+m[3]);if(m[2]==='Source'&&v.t==='s')v.t='p';n.props[m[2]]=v;}else warn.push('Unsupported value at '+m[1]+'.'+m[2])}
      continue;
    }
    if(/:Connect\s*\(|\bfunction\b|\btask\.(wait|spawn|delay)\b/.test(st)){
      warn.push('Runtime logic is not previewed: '+st.replace(/\s+/g,' ').slice(0,52));
      continue;
    }
    // Valid Luau declarations and assignments that do not directly create UI.
    // Recognize them instead of incorrectly reporting them as unsupported.
    if(/^(?:local\s+)?[A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)*\s*=\s*[\s\S]+$/.test(st)) continue;
    if(/^(?:local\s+)?[A-Za-z_]\w*(?:\.[A-Za-z_]\w*|\[[^\]]+\])*\s*[+\-*/]?=/.test(st)) continue;
    if(!/^(end|do|return)\b/.test(st))
      warn.push('Unsupported statement: '+st.replace(/\s+/g,' ').slice(0,60));
  }
  let roots=[];
  const previewClasses=new Set(['ScreenGui','Frame','TextLabel','TextButton','TextBox','ImageLabel','ImageButton','ScrollingFrame','CanvasGroup','ViewportFrame','VideoFrame','UICorner','UIStroke','UIListLayout','UIGridLayout','UIPadding','UIAspectRatioConstraint','UISizeConstraint','UITextSizeConstraint','UIPageLayout','UITableLayout','UIFlexItem','LocalScript','Script','ModuleScript','Folder']);
  for(const n of all){
    if(!previewClasses.has(n.cls))warn.push('Roblox class '+n.cls+' is kept in the model but is not drawn in the preview');
    if(n.pref&&!vars[n.pref]&&!/^(?:game\.|workspace\b|script\b)/.test(n.pref))warn.push('Parent reference not found for '+n.vn+': '+n.pref);
    const p=n.pref&&vars[n.pref];if(p&&p!==n)p.kids.push(n);else roots.push(n);
  }
  if(!roots.length&&src.trim()){
    const script={cls:'LocalScript',vn:'MainLocalScript',props:{Name:{t:'s',v:'MainLocalScript'},Source:{t:'p',v:src}},kids:[]};
    roots=[{cls:'ScreenGui',vn:'LuaGui',props:{Name:{t:'s',v:'LuaGui'}},kids:[script]}];
    warn.push('No static UI objects detected: the pasted code was preserved as a LocalScript');
  }
  const loose=roots.filter(n=>n.cls!=='ScreenGui');
  if(loose.length){
    roots=roots.filter(n=>n.cls==='ScreenGui');
    roots.push({cls:'ScreenGui',vn:'LuaGui',props:{Name:{t:'s',v:'LuaGui'}},kids:loose});
    warn.push('Objects without a ScreenGui: an automatic ScreenGui was created');
  }
  // Preserve runtime callbacks and other non-visual logic that the static
  // UI parser cannot rebuild as individual Roblox instances. Keep it in a
  // ModuleScript so importing the model never executes the original source.
  const hasRuntimeLogic=/(?:\.Connect\s*\(|\bfunction\b|\btask\.(?:wait|spawn|delay)\b|\b(?:MouseButton1Click|MouseButton2Click|Activated|InputBegan|InputEnded|Touched)\s*[:=])/.test(src);
  if(hasRuntimeLogic&&src.trim()){
    const hasExactSource=(function scan(n){return (['LocalScript','Script','ModuleScript'].includes(n.cls)&&n.props.Source&&n.props.Source.v===src)||n.kids.some(scan)})(roots[0]||{kids:[]});
    if(!hasExactSource){
      const target=roots.find(r=>r.cls==='ScreenGui')||roots[0];
      if(target){
        target.kids.push({cls:'ModuleScript',vn:'Lua2GuiPreservedLogic',props:{Name:{t:'s',v:'Lua2GuiPreservedLogic'},Source:{t:'p',v:src}},kids:[]});
        warn.push('Runtime logic preserved in a ModuleScript named Lua2GuiPreservedLogic. It is not auto-run; connect or move its code to the appropriate scripts in Roblox Studio.');
      }
    }
  }
  return{roots,warn};
}

/* ---------- XML do Roblox ---------- */
let rid=0;
function prop(k,v){
  const a='name="'+k+'"';
  switch(v.t){
    case's':return T[k]==='c'?'<Content '+a+'><url>'+esc(v.v)+'</url></Content>':'<string '+a+'>'+esc(v.v)+'</string>';
    case'p':return'<ProtectedString '+a+'><![CDATA['+v.v.replace(/\]\]>/g,']]]]><![CDATA[>')+']]></ProtectedString>';
    case'b':return'<bool '+a+'>'+v.v+'</bool>';
    case'n':return T[k]==='i'?'<int '+a+'>'+Math.round(v.v)+'</int>':'<float '+a+'>'+v.v+'</float>';
    case'UDim2':return'<UDim2 '+a+'><XS>'+v.v[0]+'</XS><XO>'+Math.round(v.v[1])+'</XO><YS>'+v.v[2]+'</YS><YO>'+Math.round(v.v[3])+'</YO></UDim2>';
    case'UDim':return'<UDim '+a+'><S>'+v.v[0]+'</S><O>'+Math.round(v.v[1])+'</O></UDim>';
    case'Vector2':return'<Vector2 '+a+'><X>'+v.v[0]+'</X><Y>'+v.v[1]+'</Y></Vector2>';
    case'Color3':return'<Color3 '+a+'><R>'+v.v[0]+'</R><G>'+v.v[1]+'</G><B>'+v.v[2]+'</B></Color3>';
    case'e':{const n=E[v.en]&&E[v.en][v.v];return n==null?'':'<token '+a+'>'+n+'</token>'}
  }
  return'';
}
function ser(n){
  let x=n.props.Name?'':'<string name="Name">'+esc(n.vn||n.cls)+'</string>';
  for(const k in n.props)x+=prop(k,n.props[k]);
  return'<Item class="'+esc(n.cls)+'" referent="RBX'+(rid++)+'"><Properties>'+x+'</Properties>'+n.kids.map(ser).join('')+'</Item>';
}
function toXML(roots){
  rid=0;
  return'<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">\n'+roots.map(ser).join('\n')+'\n</roblox>';
}

/* ---------- preview ---------- */
const VIS=/^(Frame|TextLabel|TextButton|TextBox|ImageLabel|ImageButton|ScrollingFrame|CanvasGroup|ViewportFrame|VideoFrame)$/;
const px=(s,o)=>'calc('+s*100+'% + '+o+'px)';
const col=(c,d,al)=>'rgba('+(c?c.v:d).map(x=>Math.round(x*255)).join(',')+','+al+')';
let previewNodeId=0, previewNodes=[];
function render(n,host){
  const p=n.props,g=k=>p[k]&&p[k].v;
  let el=host;
  if(n.cls!=='ScreenGui'){
    if(!VIS.test(n.cls))return;
    el=document.createElement('div');el.className='g';el.dataset.nodeId=String(previewNodeId++);n._previewId=Number(el.dataset.nodeId);previewNodes.push(n);
    const z=g('Size')||[0,0,0,0],q=g('Position')||[0,0,0,0],a=g('AnchorPoint')||[0,0],s=el.style;
    const inLayout=host!==$('stage')&&(host.style.display==='flex'||host.style.display==='grid');
    s.position=inLayout?'relative':'absolute';s.width=px(z[0],z[1]);s.height=px(z[2],z[3]);s.left=inLayout?'auto':px(q[0],q[1]);s.top=inLayout?'auto':px(q[2],q[3]);
    if(inLayout)s.transform='none';else s.transform='translate('+(-a[0]*100)+'%,'+(-a[1]*100)+'%) rotate('+(g('Rotation')||0)+'deg)';
    s.background=col(p.BackgroundColor3,[.64,.63,.65],1-(g('BackgroundTransparency')??0));
    const bs=p.BorderSizePixel?g('BorderSizePixel'):1;
    s.border=bs+'px solid '+col(p.BorderColor3,[.1,.16,.21],1);
    s.boxSizing='border-box';
    if(p.Visible&&g('Visible')===false)s.display='none';
    if(p.ZIndex)s.zIndex=g('ZIndex');
    if(p.ClipsDescendants&&g('ClipsDescendants'))s.overflow='hidden';
    for(const k of n.kids){
      const kp=k.props,gv=name=>kp[name]&&kp[name].v;
      if(k.cls==='UICorner'){const r=gv('CornerRadius')||[0,8];s.borderRadius=r[0]?r[0]*100+'%':r[1]+'px'}
      if(k.cls==='UIStroke'){s.boxShadow='inset 0 0 0 '+(gv('Thickness')||1)+'px '+col(kp.Color,[0,0,0],1-(gv('Transparency')||0))}
      if(k.cls==='UIListLayout'){s.display='flex';s.flexDirection=gv('FillDirection')==='Horizontal'?'row':'column';s.justifyContent=({Center:'center',Right:'flex-end',Bottom:'flex-end',Left:'flex-start',Top:'flex-start'})[gv('HorizontalAlignment')]||'flex-start';s.alignItems=({Center:'center',Right:'flex-end',Bottom:'flex-end',Left:'flex-start',Top:'flex-start'})[gv('VerticalAlignment')]||'flex-start';const pd=gv('Padding');if(pd)s.gap=(pd[0]*100)+'%';}
      if(k.cls==='UIGridLayout'){s.display='grid';const cs=gv('CellSize')||[0,120,0,80],gap=gv('CellPadding')||[0,8,0,8];s.gridTemplateColumns='repeat(auto-fill,minmax('+Math.max(70,cs[1])+'px,1fr))';s.gap=(gap[1]||0)+'px '+(gap[3]||0)+'px';}
      if(k.cls==='UIPadding'){const unit=name=>{const v=gv(name)||[0,0];return (v[0]*100)+'% + '+v[1]+'px'};s.padding='calc('+unit('PaddingTop')+') calc('+unit('PaddingRight')+') calc('+unit('PaddingBottom')+') calc('+unit('PaddingLeft')+')';}
      if(k.cls==='UIAspectRatioConstraint'&&gv('AspectRatio'))s.aspectRatio=gv('AspectRatio');
    }
    if(n.cls==='ImageLabel'||n.cls==='ImageButton'){
      const image=String(g('Image')||'');if(image){const im=document.createElement('img');im.className='preview-image';im.alt='';im.src=/^rbxassetid:\/\/\d+$/.test(image)?'https://www.roblox.com/asset/?id='+image.split('//')[1]:/^https:\/\//.test(image)?image:'';if(im.src)el.appendChild(im);}
      if(g('ScaleType')==='Fit')el.style.objectFit='contain';
    }
    if(/^Text/.test(n.cls)){
      const t=document.createElement('span');t.className='t';
      const xa=(p.TextXAlignment&&p.TextXAlignment.v)||'Center',ya=(p.TextYAlignment&&p.TextYAlignment.v)||'Center';
      const fx={Left:'flex-start',Center:'center',Right:'flex-end'},fy={Top:'flex-start',Center:'center',Bottom:'flex-end'};
      t.style.justifyContent=fx[xa];t.style.alignItems=fy[ya];t.style.textAlign=xa.toLowerCase();
      t.style.color=col(p.TextColor3,[.1,.16,.21],1-(g('TextTransparency')??0));
      t.style.fontSize=(g('TextSize')||14)+'px';
      if(g('TextWrapped'))t.style.whiteSpace='pre-wrap';
      if(g('TextScaled'))t.style.fontSize='clamp(8px, 2vw, '+(g('TextSize')||18)+'px)';
      if(g('TextStrokeTransparency')!==undefined&&g('TextStrokeTransparency')<1)t.style.textShadow='-1px -1px 0 '+col(p.TextStrokeColor3,[0,0,0],1-g('TextStrokeTransparency'))+',1px 1px 0 '+col(p.TextStrokeColor3,[0,0,0],1-g('TextStrokeTransparency'));
      const f=(p.Font&&p.Font.v)||'SourceSans';
      t.style.fontWeight=/Bold|Black/.test(f)?800:400;
      t.style.fontFamily='system-ui,sans-serif';
      t.textContent=p.Text?g('Text'):(n.cls==='TextLabel'?'Label':n.cls==='TextButton'?'Button':'');
      el.appendChild(t);
    }
    host.appendChild(el);
  }
  n.kids.forEach(c=>render(c,el));
}

/* ---------- interface ---------- */
let XML='';
const cnt=n=>1+n.kids.reduce((a,k)=>a+cnt(k),0);
const np=n=>Object.keys(n.props).length+n.kids.reduce((a,k)=>a+np(k),0);
const tree=(n,d)=>'  '.repeat(d)+(d?'└ ':'')+n.cls+'  “'+((n.props.Name&&n.props.Name.v)||n.vn||n.cls)+'”'+((n.cls==='LocalScript'||n.cls==='Script'||n.cls==='ModuleScript')?'  [source '+(n.props.Source?'included':'empty')+']':'')+'\n'+n.kids.map(k=>tree(k,d+1)).join('');
const scriptCount=n=>((n.cls==='LocalScript'||n.cls==='Script'||n.cls==='ModuleScript')?1:0)+n.kids.reduce((a,k)=>a+scriptCount(k),0);
function msg(t){$('msg').textContent=t}
let view={w:800,h:450,zoom:1};
function setDevice(){const mode=$('device').value;view=mode==='phone'?{w:390,h:844,zoom:1}:mode==='tablet'?{w:768,h:1024,zoom:1}:{w:800,h:450,zoom:1};const sh=$('deviceShell'),st=$('stage');sh.className='device-shell '+(mode==='desktop'?'':mode);sh.style.width=view.w+'px';sh.style.height=view.h+'px';st.style.width=view.w+'px';st.style.height=view.h+'px';fit()}
function fit(){const scale=Math.min($('pv').clientWidth/view.w,680/view.h)*view.zoom;$('stage').style.transform='scale('+scale+')';$('deviceShell').style.width=view.w*scale+'px';$('deviceShell').style.height=view.h*scale+'px';$('pv').style.height=Math.max(180,view.h*scale)+'px';$('zoomValue').textContent=$('zoom').value+'%'}
function run(){
  const{roots,warn}=build($('src').value);
  const source=$('src').value;
  if($('includeRuntime').checked&&source.trim()&&roots.length){
    const hasSource=roots.some(function scan(n){return ((n.cls==='LocalScript'||n.cls==='Script'||n.cls==='ModuleScript')&&n.props.Source)||n.kids.some(scan)});
    if(!hasSource){const target=roots.find(r=>r.cls==='ScreenGui')||roots[0];target.kids.push({cls:'LocalScript',vn:'Lua2GuiSource',props:{Name:{t:'s',v:'Lua2GuiSource'},Source:{t:'p',v:source}},kids:[]});warn.push('Original source added as a LocalScript. It may execute when placed in a runnable Roblox location.');}
  }
  const st=$('stage');st.innerHTML='';previewNodeId=0;previewNodes=[];
  if(!roots.length){
    XML='';$('out').value='';$('tree').textContent='No UI objects detected yet.';
    st.innerHTML='<div class="empty" style="width:800px;height:450px">Paste a script to preview your UI</div>';
  }else{
    XML=toXML(roots);$('out').value=XML;
    roots.forEach(r=>render(r,st));
    $('tree').textContent=roots.map(r=>tree(r,0)).join('');
  }
  buildObjectTree(roots);
  $('s1').textContent=roots.reduce((a,r)=>a+cnt(r),0);
  $('s2').textContent=roots.reduce((a,r)=>a+np(r),0);
  $('s3').textContent=warn.length;
  $('s4').textContent=roots.reduce((a,r)=>a+scriptCount(r),0);
  $('warn').innerHTML=warn.slice(0,6).map(w=>'<div>'+esc(w)+'</div>').join('')+(warn.length>6?'<div>…e mais '+(warn.length-6)+'</div>':'');
  ['dzip','dtxt','cp'].forEach(i=>$(i).disabled=!XML);
  $('dlua').disabled=!$('src').value.trim();
  fit();
}

/* zip simples (sem compressão) para entregar o .rbxmx com a extensão certa */
function crc(b){
  if(!crc.t)crc.t=Array.from({length:256},(_,n)=>{let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;return c>>>0});
  let r=-1;for(const x of b)r=crc.t[(r^x)&255]^(r>>>8);
  return(r^-1)>>>0;
}
function zip(name,text){
  const u16=n=>[n&255,n>>8&255],u32=n=>[n&255,n>>8&255,n>>16&255,n>>>24];
  const nb=new TextEncoder().encode(name),d=new TextEncoder().encode(text),c=crc(d),L=d.length;
  const lh=[80,75,3,4,...u16(20),...u16(0),...u16(0),...u16(0),...u16(33),...u32(c),...u32(L),...u32(L),...u16(nb.length),...u16(0),...nb];
  const cd=[80,75,1,2,...u16(20),...u16(20),...u16(0),...u16(0),...u16(0),...u16(33),...u32(c),...u32(L),...u32(L),...u16(nb.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(0),...nb];
  const end=[80,75,5,6,...u16(0),...u16(0),...u16(1),...u16(1),...u32(cd.length),...u32(lh.length+L),...u16(0)];
  return new Blob([new Uint8Array(lh),d,new Uint8Array(cd),new Uint8Array(end)]);
}
function saveBlob(filename, blob){
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=filename;a.style.display='none';
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
}
async function dl(kind){
  const nm=($('fname').value.trim().replace(/[^\w\-]+/g,'_')||'LuaGui');
  try{
    if(kind==='zip') saveBlob(nm+'.zip',zip(nm+'.rbxmx',XML));
    else if(kind==='lua') saveBlob(nm+'.lua',new Blob([$('src').value],{type:'text/plain;charset=utf-8'}));
    else saveBlob(nm+'.rbxmx',new Blob([XML],{type:'application/xml;charset=utf-8'}));
    msg(kind==='zip'?'ZIP downloaded. Extract it and import '+nm+'.rbxmx into Studio.':kind==='lua'?'Original Luau source downloaded as '+nm+'.lua.':'RBXMX file downloaded. Import it into Roblox Studio.');
  }catch(e){msg('Download failed. Try “Copy XML” instead.');}
}
function displayValue(v){
  if(v===null||v===undefined)return '—';
  if(Array.isArray(v))return v.map(x=>typeof x==='number'?Number(x.toFixed(3)):x).join(', ');
  if(typeof v==='object')return v.v!==undefined?displayValue(v.v):JSON.stringify(v);
  return String(v);
}
function buildObjectTree(roots){
  const treeHost=$('objectTree');treeHost.innerHTML='';
  const nodes=[];
  function walk(n,depth){nodes.push({n,depth});n.kids.forEach(k=>walk(k,depth+1))}
  roots.forEach(n=>walk(n,0));
  $('objectCount').textContent=nodes.length+' objects';
  if(!nodes.length){treeHost.innerHTML='<div class="panel-empty">No objects detected</div>';$('inspector').innerHTML='<div class="panel-empty">Paste a supported UI script to inspect properties.</div>';$('selectedClass').textContent='NONE';return}
  nodes.forEach(({n,depth})=>{
    const b=document.createElement('button');b.type='button';b.className='tree-item';b.dataset.nodeId=n._previewId===undefined?'':String(n._previewId);
    b.style.paddingLeft=(8+depth*14)+'px';
    const name=(n.props.Name&&n.props.Name.v)||n.vn||n.cls;
    b.innerHTML='<span>▰</span><span>'+esc(name)+'</span><span class="tree-class">'+esc(n.cls)+'</span>';
    b.addEventListener('click',()=>selectPreviewNode(n));
    treeHost.appendChild(b);
  });
  $('inspector').innerHTML='<div class="panel-empty">Tap an element in the canvas or hierarchy.</div>';
  $('selectedClass').textContent='NONE';
}
function selectPreviewNode(n){
  document.querySelectorAll('.g.is-selected').forEach(el=>el.classList.remove('is-selected'));
  document.querySelectorAll('.tree-item.active').forEach(el=>el.classList.remove('active'));
  const el=n._previewId!==undefined?document.querySelector('.g[data-node-id="'+n._previewId+'"]'):null;
  if(el)el.classList.add('is-selected');
  document.querySelectorAll('.tree-item').forEach(b=>{if(b.dataset.nodeId===String(n._previewId))b.classList.add('active')});
  $('selectedClass').textContent=n.cls;
  const props={Name:(n.props.Name&&n.props.Name.v)||n.vn||n.cls,...Object.fromEntries(Object.entries(n.props).filter(([k])=>k!=='Name').map(([k,v])=>[k,v.v]))};
  const rows=Object.entries(props).map(([k,v])=>'<div class="prop-row"><span>'+esc(k)+'</span><span>'+esc(displayValue(v))+'</span></div>').join('');
  $('inspector').innerHTML=rows||'<div class="panel-empty">No properties assigned.</div>';
}
$('stage').addEventListener('click',e=>{
  const el=e.target.closest('.g');if(!el)return;
  const n=previewNodes.find(x=>String(x._previewId)===el.dataset.nodeId);if(n)selectPreviewNode(n);
});
$('gridToggle').onchange=()=>{$('pv').classList.toggle('no-grid',!$('gridToggle').checked)};
$('canvasBg').onchange=()=>{$('pv').classList.remove('bg-dark','bg-light');if($('canvasBg').value==='dark')$('pv').classList.add('bg-dark');if($('canvasBg').value==='light')$('pv').classList.add('bg-light')};
$('fullBtn').onclick=()=>{const p=$('pv');if(!document.fullscreenElement&&p.requestFullscreen)p.requestFullscreen();else if(document.exitFullscreen)document.exitFullscreen()};
$('go').onclick=run;
$('ex').onclick=()=>{$('src').value=SAMPLE;run()};
$('clr').onclick=()=>{$('src').value='';run()};
$('dzip').onclick=()=>dl('zip');
$('dtxt').onclick=()=>dl('rbxmx');
$('dlua').onclick=()=>dl('lua');
$('cp').onclick=()=>{
  const ok=()=>msg('XML copied! Paste it into a file ending in .rbxmx.');
  const fb=()=>{$('out').select();let r=false;try{r=document.execCommand('copy')}catch(e){}msg(r?'XML copied! Save it as a .rbxmx file.':'Select the text box and copy the XML manually.')};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(XML).then(ok,fb);else fb();
};
$('file').onchange=async e=>{const f=e.target.files[0];if(f){$('src').value=await f.text();run()}};
let tm;$('src').oninput=()=>{clearTimeout(tm);tm=setTimeout(run,350)};
$('device').onchange=()=>{setDevice();run()};
$('zoom').oninput=()=>{view.zoom=Number($('zoom').value)/100;$('zoomValue').textContent=$('zoom').value+'%';fit()};
$('fitBtn').onclick=()=>{$('zoom').value=100;view.zoom=1;fit()};
$('includeRuntime').onchange=run;
addEventListener('resize',fit);
$('src').value=SAMPLE;setDevice();run();

/* Studio workspace keyboard and resize polish */
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){
    e.preventDefault();
    run();
    msg('Preview updated.');
  }
  if(e.key==='Escape'&&document.fullscreenElement&&document.exitFullscreen){
    document.exitFullscreen();
  }
});
document.addEventListener('fullscreenchange',()=>{
  requestAnimationFrame(()=>fit());
});
if('ResizeObserver' in window){
  const previewObserver=new ResizeObserver(()=>fit());
  const previewElement=$('pv');
  if(previewElement)previewObserver.observe(previewElement);
}
