window.addEventListener("load",(function(){window.addEventListener("scroll",(function(){const e=document.querySelector(".fixed-navigation"),t=document.querySelector(".navigation");window.scrollY>0?(e.classList.add("scrolled"),t.style.top="0"):(e.classList.remove("scrolled"),t.style.top="")}));const e=document.querySelector(".parallax-bg"),t=document.querySelector(".opacity-bg"),o=document.querySelector(".paralax-image"),n=document.querySelector(".parallax-header"),c=(document.querySelector(".progect-talk"),document.querySelector(".parallax-bg")),l=document.querySelector(".opacity-bg");window.addEventListener("scroll",(()=>{const o=window.scrollY;e.style.transform=`translateY(${-.5*o}px)`,t.style.transform=`translateY(${-.5*o}px)`})),document.addEventListener("mousemove",(e=>{let t=e.clientX+350,r=e.clientY+350;const s=n.getBoundingClientRect(),a=(s.width/2-t)/100,i=(s.height/2-r)/100;c.style.backgroundPosition=`${a}rem ${i}rem`,l.style.backgroundPosition=`${a}rem ${i}rem`,o.style.backgroundPosition=`${a}rem ${i}rem`}));const r=document.querySelector(".burger"),s=document.querySelector(".mobile-menu");r.addEventListener("click",(function(){this.classList.toggle("active"),s.classList.toggle("activemobile")}));function a(){document.querySelectorAll("section").forEach((e=>{const t=e.getBoundingClientRect().top;t<window.innerHeight/2&&t<0?(e.style.opacity=1,e.style.transform="translateX(0)"):(e.style.opacity=0,e.style.transform="translateY(20px)")}))}[...document.querySelectorAll(".nav-menu")].forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault();let t=e.target.getAttribute("data-href"),o=document.querySelector(t).offsetTop+40;if(t){let e=function e(){clearInterval(t),window.removeEventListener("click",e),window.removeEventListener("mousewheel",e),window.removeEventListener("contextmenu",e),console.log("stop")};const t=setInterval((()=>{window.addEventListener("click",e),window.addEventListener("mousewheel",e),window.addEventListener("contextmenu",e);const n=o-window.scrollY,c=.1*n;Math.abs(n)<=1||Math.abs(c)<=1?clearInterval(t):window.scrollBy(0,c)}),30)}}))})),a(),window.addEventListener("scroll",(function(){a()})),window.addEventListener("resize",a);const i=document.querySelector(".carousel"),d=document.querySelector("#prevBtn"),u=document.querySelector("#nextBtn"),m=[...document.querySelectorAll(".carousel-item")];m.forEach(((e,t)=>{console.log(e,t);const o=e.cloneNode(!0);console.log(o),i.appendChild(o)}));let y=0,g=m[0].offsetWidth+30;function v(){const e=-y*g;i.style.transition="transform 0.5s ease-in-out",i.style.transform=`translateX(${e}px)`}u.addEventListener("click",(()=>{y++,y>m.length&&(y=0),v()})),d.addEventListener("click",(()=>{y--,y<0&&(y=m.length),v()}));const p=[...document.querySelectorAll(".img-cards")],f=[...document.querySelectorAll(".text-block")],h=[...document.querySelectorAll(".click-block")];console.log(p),p.forEach(((e,t)=>{e.addEventListener("click",(function(){h[t].classList.toggle("active-red"),f[t].classList.toggle("active-text")}));const o=document.getElementById("openPopupButton");authPopup=document.getElementById("authPopup"),dragArea=document.getElementById("dragArea"),blocks=document.querySelectorAll(".block"),blockPlaces=[...document.querySelectorAll(".block-place")],statusMessage=document.getElementById("statusMessage");let n=null;blocks.forEach((e=>{e.addEventListener("dragstart",(t=>{t.dataTransfer.setData("text/plain",e.getAttribute("data-order")),n=e}))})),blockPlaces.forEach((e=>{e.addEventListener("dragover",(e=>{e.preventDefault()})),e.addEventListener("drop",(t=>{t.preventDefault(),n&&(e.appendChild(n),function(){const e=blockPlaces[0],t=blockPlaces[1],o=blockPlaces[2];e.contains(blocks[0])&&t.contains(blocks[1])&&o.contains(blocks[2])?(authPopup.style.display="none",document.title="Startup are welcome to you!",statusMessage.innerText="Woo-hoo! You get it! Authorization successful! Welcome!"):statusMessage.innerText="Authorization error. Drag the blocks in the correct sequence."}())}))})),o.addEventListener("click",(()=>{authPopup.style.display="block"}))}));document.querySelectorAll(".card-figure").forEach((e=>{const t=e.querySelector(".circle"),o=e.querySelector("p.personal");t.addEventListener("click",(()=>{t.classList.contains("active")?(t.classList.remove("active"),o.textContent="Clean Typography",o.style.fontWeight="normal",o.style.color="initial"):(t.classList.add("active"),o.textContent="Hack This Site",o.style.fontWeight="bold",o.style.color="#c0301c")}))}));const E=document.querySelectorAll('input[name="radio-coment"]'),w=document.querySelectorAll(".coment");E.forEach((e=>{e.addEventListener("change",(()=>{const t=e.value,o=document.getElementById(t);w.forEach((e=>{e.classList.remove("active")})),o.classList.add("active")}))}))}));