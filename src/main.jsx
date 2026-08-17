import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight, BookOpen, Check, ChevronDown, CircleHelp, Clock3,
  Download, Flame, FolderHeart, GalleryVerticalEnd, Image as ImageIcon,
  Languages, LayoutGrid, Lightbulb, Menu, MessageCircleMore, MoreHorizontal,
  Pencil, Plus, RefreshCw, Search, Settings, Share2, Sparkles, WandSparkles,
  X, Zap
} from 'lucide-react';
import './styles.css';

const TEMPLATES = [
  {
    id: 'chai', name: 'Chai Break', tag: 'RELATABLE',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=90',
    captions: {
      Hinglish: 'Ek hi toh dil hai,\nkitni baar chai pe aaega?',
      Hindi: 'एक ही तो दिल है,\nकितनी बार चाय पर आएगा?',
      English: 'One tiny heart,\nway too many chai breaks.'
    }
  },
  {
    id: 'auto', name: 'Main Character', tag: 'BOLLYWOOD',
    image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1200&q=90',
    captions: {
      Hinglish: 'Main late nahi hoon,\nzindagi thodi fast hai.',
      Hindi: 'मैं लेट नहीं हूँ,\nज़िंदगी थोड़ी तेज़ है।',
      English: "I'm not late.\nLife is just too fast."
    }
  },
  {
    id: 'exam', name: 'Exam Season', tag: 'STUDENT LIFE',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=90',
    captions: {
      Hinglish: 'Kal exam hai.\nAaj motivation dhoondhte hain.',
      Hindi: 'कल परीक्षा है।\nआज प्रेरणा ढूँढते हैं।',
      English: 'Exam tomorrow.\nMotivation still buffering.'
    }
  },
  {
    id: 'wedding', name: 'Shaadi Scene', tag: 'DESI CORE',
    image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=1200&q=90',
    captions: {
      Hinglish: 'Shaadi unki hai,\npressure mujhe kyun?',
      Hindi: 'शादी उनकी है,\nदबाव मुझ पर क्यों?',
      English: "It's their wedding.\nWhy am I under pressure?"
    }
  }
];

const AFFECTS = [
  { key: 'humour', label: 'Humour', icon: '☺', color: '#ff7358' },
  { key: 'sarcasm', label: 'Sarcasm', icon: '↝', color: '#e4aa20' },
  { key: 'romance', label: 'Romance', icon: '♥', color: '#ec5b94' },
  { key: 'absurdity', label: 'Absurdity', icon: '✦', color: '#8f74e8' },
  { key: 'wholesome', label: 'Wholesome', icon: '☀', color: '#53a879' },
];

const starterPrompt = 'Ek hi toh dil hai, usko bhi paanch mein baant doon';

function Sidebar({ open, onClose }) {
  const nav = [
    [WandSparkles, 'Create', true], [GalleryVerticalEnd, 'Template Library'],
    [FolderHeart, 'My Memes'], [Flame, 'Explore']
  ];
  return <>
    {open && <div className="scrim" onClick={onClose} />}
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <button className="mobile-close" onClick={onClose}><X size={20}/></button>
      <div className="brand"><div className="brand-mark"><span>म</span></div><div>MeMe<span>-Mee</span></div></div>
      <p className="nav-label">STUDIO</p>
      <nav>{nav.map(([Icon, label, active]) => <button className={active ? 'active' : ''} key={label}><Icon size={18}/><span>{label}</span>{label === 'Explore' && <b>NEW</b>}</button>)}</nav>
      <p className="nav-label second">LEARN</p>
      <nav><button><BookOpen size={18}/><span>How it works</span></button><button><Lightbulb size={18}/><span>Prompt guide</span></button></nav>
      <div className="sidebar-bottom">
        <div className="credit-card">
          <div className="credit-top"><Zap size={15} fill="currentColor"/><span>24 rasas left</span></div>
          <div className="credit-track"><i /></div>
          <button>Get more <ArrowUpRight size={14}/></button>
        </div>
        <button className="profile"><div className="avatar">KS</div><div><strong>Kiran S.</strong><small>Free plan</small></div><MoreHorizontal size={18}/></button>
      </div>
    </aside>
  </>
}

function Header({ onMenu }) {
  return <header>
    <button className="menu-btn" onClick={onMenu}><Menu size={22}/></button>
    <div className="header-title"><strong>Meme Studio</strong><span><i/> All systems funny</span></div>
    <div className="header-actions"><button className="history"><Clock3 size={17}/> History</button><button className="icon-button"><CircleHelp size={19}/></button><button className="icon-button"><Settings size={19}/></button></div>
  </header>
}

function AffectSlider({ affect, value, setValue }) {
  return <div className="affect">
    <div className="affect-head"><span className="affect-icon" style={{background: affect.color + '18', color: affect.color}}>{affect.icon}</span><label>{affect.label}</label><output style={{color: affect.color}}>{value}</output></div>
    <input aria-label={affect.label} type="range" min="0" max="100" value={value} onChange={e => setValue(+e.target.value)} style={{'--value': `${value}%`, '--accent': affect.color}} />
  </div>
}

function Creator({ language, setLanguage, values, setValues, prompt, setPrompt, onGenerate, generating }) {
  const chips = ['Exam kal hai...', 'Monday mood', 'Mummy ka call', 'Salary credited'];
  return <section className="creator">
    <div className="section-eyebrow"><Sparkles size={14}/> CULTURE MEETS COMEDY</div>
    <h1>What’s the <em>scene?</em></h1>
    <p className="lead">Give us a thought. You control the rasa.</p>

    <div className="field-head"><label>Your thought</label><div className="language-select"><Languages size={15}/><select value={language} onChange={e=>setLanguage(e.target.value)}><option>Hinglish</option><option>Hindi</option><option>English</option></select><ChevronDown size={14}/></div></div>
    <div className="prompt-box"><textarea maxLength="180" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Type a situation, thought, or inside joke..."/><span>{prompt.length}/180</span></div>
    <div className="chips">{chips.map(chip=><button key={chip} onClick={()=>setPrompt(chip)}><Plus size={13}/>{chip}</button>)}</div>

    <div className="mixer-head"><div><h2>Mix your rasa</h2><p>Fine-tune how your meme should feel.</p></div><button onClick={()=>setValues({humour:50,sarcasm:50,romance:50,absurdity:50,wholesome:50})}><RefreshCw size={14}/> Reset</button></div>
    <div className="affect-grid">{AFFECTS.map(a=><AffectSlider key={a.key} affect={a} value={values[a.key]} setValue={v=>setValues({...values,[a.key]:v})}/>)}</div>
    <button className={`generate ${generating ? 'loading' : ''}`} onClick={onGenerate} disabled={!prompt.trim() || generating}><WandSparkles size={19}/><span>{generating ? 'Mixing the rasas...' : 'Generate my meme'}</span><kbd>⌘ ↵</kbd></button>
    <p className="generate-note"><Sparkles size={12}/> Creates 3 caption options tuned to your affect mix</p>
  </section>
}

function MemeCanvas({ template, caption, match, generating }) {
  return <div className={`meme-canvas ${generating ? 'is-generating' : ''}`}>
    <img src={template.image} alt={template.name} crossOrigin="anonymous"/>
    <div className="image-shade" />
    <div className="match"><Check size={12}/>{match}% RASA MATCH</div>
    <div className="template-tag">{template.tag}</div>
    <div className="meme-copy">{caption.split('\n').map((line,i)=><React.Fragment key={i}>{line}{i < caption.split('\n').length-1 && <br/>}</React.Fragment>)}</div>
    {generating && <div className="generating-overlay"><div className="spinner"/><strong>Finding the perfect punchline</strong><span>Matching culture, context & rasa...</span></div>}
  </div>
}

function Preview({ template, setTemplate, caption, setCaption, match, generating, onRemix }) {
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState('');
  const showToast = text => { setToast(text); setTimeout(()=>setToast(''),2200); };

  const download = async () => {
    try {
      const img = new Image(); img.crossOrigin = 'anonymous'; img.src = template.image;
      await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});
      const canvas=document.createElement('canvas'); canvas.width=1080; canvas.height=1080;
      const ctx=canvas.getContext('2d');
      const scale=Math.max(canvas.width/img.width,canvas.height/img.height); const w=img.width*scale,h=img.height*scale;
      ctx.drawImage(img,(1080-w)/2,(1080-h)/2,w,h);
      const gradient=ctx.createLinearGradient(0,500,0,1080);gradient.addColorStop(0,'transparent');gradient.addColorStop(1,'rgba(0,0,0,.9)');ctx.fillStyle=gradient;ctx.fillRect(0,0,1080,1080);
      ctx.font='900 72px Arial';ctx.textAlign='center';ctx.fillStyle='white';ctx.strokeStyle='black';ctx.lineWidth=10;
      caption.split('\n').forEach((line,i)=>{const y=850+i*88;ctx.strokeText(line,540,y);ctx.fillText(line,540,y)});
      const a=document.createElement('a');a.download='meme-mee.png';a.href=canvas.toDataURL('image/png');a.click(); showToast('Meme downloaded!');
    } catch { showToast('Image is ready — use Share to save it'); }
  };

  return <section className="preview-panel">
    {toast && <div className="toast"><Check size={15}/>{toast}</div>}
    <div className="preview-head"><div><span>YOUR MEME</span><h2>Fresh from the tandoor <i>🔥</i></h2></div><button><MoreHorizontal size={19}/></button></div>
    <MemeCanvas template={template} caption={caption} match={match} generating={generating}/>
    <div className="template-info"><div className="tiny-thumb"><img src={template.image}/></div><div><small>TEMPLATE</small><strong>{template.name}</strong></div><button onClick={()=>setEditing(!editing)}><Pencil size={15}/>{editing?'Done':'Edit caption'}</button></div>
    {editing && <textarea className="caption-editor" value={caption} onChange={e=>setCaption(e.target.value)} autoFocus />}
    <div className="preview-actions"><button className="remix" onClick={onRemix}><RefreshCw size={17}/> Remix</button><button onClick={()=>{navigator.clipboard?.writeText(caption);showToast('Caption copied!')}}><Share2 size={17}/> Share</button><button className="download" onClick={download}><Download size={17}/> Download</button></div>
    <div className="template-picker-head"><span>TRY ANOTHER TEMPLATE</span><button>View all <ArrowUpRight size={13}/></button></div>
    <div className="template-row">{TEMPLATES.map(t=><button key={t.id} className={template.id===t.id?'selected':''} onClick={()=>setTemplate(t)}><img src={t.image}/>{template.id===t.id&&<i><Check size={13}/></i>}</button>)}</div>
    <p className="ai-note"><Sparkles size={13}/><span><b>Rasa AI</b> selected this template based on your thought and emotion mix.</span></p>
  </section>
}

function App() {
  const [sidebar,setSidebar]=useState(false);
  const [language,setLanguage]=useState('Hinglish');
  const [prompt,setPrompt]=useState(starterPrompt);
  const [values,setValues]=useState({humour:82,sarcasm:38,romance:68,absurdity:24,wholesome:56});
  const [template,setTemplate]=useState(TEMPLATES[0]);
  const [caption,setCaption]=useState(TEMPLATES[0].captions.Hinglish);
  const [match,setMatch]=useState(94);
  const [generating,setGenerating]=useState(false);
  const generationCount=useRef(0);

  useEffect(()=>{ if (!generating) setCaption(template.captions[language]); },[template,language]);
  useEffect(()=>{ const handler=e=>{if((e.metaKey||e.ctrlKey)&&e.key==='Enter')generate()};window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler)});

  const generate=()=>{
    if(!prompt.trim()||generating)return; setGenerating(true);
    setTimeout(()=>{
      generationCount.current++;
      const strongest=Object.entries(values).sort((a,b)=>b[1]-a[1])[0][0];
      const variants={
        humour:{Hinglish:'Ek hi toh dil hai,\npar crushes ka group project hai.',Hindi:'एक ही तो दिल है,\nपर पसंद का ग्रुप प्रोजेक्ट है।',English:'One heart.\nFive crushes. Great planning.'},
        sarcasm:{Hinglish:'Haan, ek hi dil hai.\nObviously sabko de dete hain.',Hindi:'हाँ, एक ही दिल है।\nज़ाहिर है, सबको दे देते हैं।',English:'Sure, one heart.\nLet’s give everyone a piece.'},
        romance:{Hinglish:'Dil ek hi hai,\npar har dhadkan tumhari.',Hindi:'दिल एक ही है,\nपर हर धड़कन तुम्हारी।',English:'Only one heart,\nand every beat is yours.'},
        absurdity:{Hinglish:'Dil ka bhi family pack\nlaunch kar dete hain.',Hindi:'दिल का भी फैमिली पैक\nनिकाल देते हैं।',English:'Launching the heart\nfamily pack today.'},
        wholesome:{Hinglish:'Dil ek hai,\npyaar unlimited.',Hindi:'दिल एक है,\nप्यार असीमित।',English:'One heart.\nUnlimited love.'}
      };
      setCaption(variants[strongest][language]);
      setMatch(Math.min(98,88+Math.round(Math.max(...Object.values(values))/10)));
      setGenerating(false);
    },1200)
  };
  const remix=()=>{setTemplate(TEMPLATES[(TEMPLATES.findIndex(t=>t.id===template.id)+1)%TEMPLATES.length]);setMatch(m=>Math.max(88,m-1))};

  return <div className="app-shell"><Sidebar open={sidebar} onClose={()=>setSidebar(false)}/><main><Header onMenu={()=>setSidebar(true)}/><div className="workspace"><Creator {...{language,setLanguage,values,setValues,prompt,setPrompt,onGenerate:generate,generating}}/><Preview {...{template,setTemplate,caption,setCaption,match,generating,onRemix:remix}}/></div></main></div>
}

createRoot(document.getElementById('root')).render(<App />);
