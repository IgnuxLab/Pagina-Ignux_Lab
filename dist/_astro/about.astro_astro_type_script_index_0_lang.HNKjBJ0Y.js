document.addEventListener("DOMContentLoaded",function(){console.log("DOM Content Loaded - initializing team functionality");const l=document.querySelectorAll(".team-card"),i=document.querySelector("#teamModal"),c=document.querySelector(".team-modal-content"),g=document.querySelector(".team-modal-close"),p=document.querySelector(".team-modal-backdrop");console.log("Found elements:",{teamCards:l.length,modal:!!i,modalContent:!!c,closeBtn:!!g,backdrop:!!p});const v={sofia:{name:"Sofía Hurtado Montes",role:"Gerente Laboratorio Creativo",image:"Sofia-Hurtado.webp",fullBio:"Graduada del pregrado en Arte de la Universidad de los Andes, con opción en Escritura Creativa. Magíster en Artes Plásticas, Electrónicas y del Tiempo de la misma institución. Ha complementado su formación con cursos de actualización en universidades de París y del Reino Unido. Cuenta con seis años de experiencia en comunicaciones, marketing digital y proyectos audiovisuales.",education:["Pregrado en Arte - Universidad de los Andes","Opción en Escritura Creativa","Magíster en Artes Plásticas, Electrónicas y del Tiempo - Universidad de los Andes","Cursos de actualización - Universidades de París y Reino Unido"],experience:"6 años",specialties:["Comunicaciones","Marketing Digital","Proyectos Audiovisuales","Arte","Escritura Creativa"]},alexander:{name:"Alexander Narváez",role:"Gerente Laboratorio de Proyectos",image:"Alexander-Narvaez.webp",fullBio:"Ingeniero industrial con más de 15 años de experiencia en la dirección de proyectos financiados con recursos públicos, especialmente del Sistema General de Regalías (SGR). Especialista en Gestión de Proyectos de Ingeniería y Magíster en Gobierno y Políticas Públicas. Se ha desempeñado como gerente, asesor, coordinador y profesional de seguimiento en entidades y proyectos de alto impacto en desarrollo regional, innovación, ciencia y tecnología. Cuenta con amplia experiencia en procesos de interventoría, formulación, seguimiento y evaluación de proyectos públicos.",education:["Ingeniería Industrial","Especialista en Gestión de Proyectos de Ingeniería","Magíster en Gobierno y Políticas Públicas"],experience:"15+ años",specialties:["Gestión de Proyectos SGR","Políticas Públicas","Desarrollo Regional","Innovación","Ciencia y Tecnología","Interventoría","Evaluación de Proyectos"]},camilo:{name:"Camilo Castro",role:"Gerente General",image:"Camilo_Castro.webp",fullBio:"Ingeniero con especialización y maestría en Gerencia, apasionado por el liderazgo de equipos de alto desempeño. Con más de 20 años de trayectoria, ha impulsado la innovación en los sectores público y privado, generando resultados de alto impacto.",education:["Ingeniería","Especialización en Gerencia","Maestría en Gerencia"],experience:"20+ años",specialties:["Liderazgo","Equipos de Alto Desempeño","Innovación","Gestión Empresarial","Sector Público","Sector Privado"]},daniela:{name:"Daniela Arango Sánchez",role:"Gerente Administrativo",image:"Daniela-Arango.webp",fullBio:"Administradora de Empresas con más de cuatro años de experiencia en la gestión de procesos administrativos y de recursos humanos en los sectores educativo y tecnológico. Ha complementado su formación con estudios en inteligencia de negocios y en sistemas de gestión de calidad, lo que le ha permitido fortalecer y optimizar procesos organizacionales.",education:["Administración de Empresas","Estudios en Inteligencia de Negocios","Sistemas de Gestión de Calidad"],experience:"4+ años",specialties:["Procesos Administrativos","Recursos Humanos","Sector Educativo","Sector Tecnológico","Inteligencia de Negocios","Gestión de Calidad"]}};function d(e){console.log("Toggling card:",e),l.forEach(a=>{a!==e&&a.classList.remove("active")}),e.classList.contains("active")?(e.classList.remove("active"),console.log("Removed active class")):(e.classList.add("active"),console.log("Added active class"))}function r(e){console.log("Opening modal for:",e);const o=v[e];if(!o){console.error("Member not found:",e);return}const t=`
                <div class="modal-header">
                    <div class="modal-avatar">
                        <img src="${`/img/equipo/${o.image}`}" alt="${o.name}" />
                    </div>
                    <div class="modal-title-section">
                        <h3 class="modal-name">${o.name}</h3>
                        <p class="modal-role">${o.role}</p>
                        <div class="modal-experience">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
                            </svg>
                            <span>${o.experience} de experiencia</span>
                        </div>
                    </div>
                </div>
                
                <div class="modal-body">
                    <div class="modal-section">
                        <h4 class="section-title">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                            Perfil Profesional
                        </h4>
                        <p class="bio-text">${o.fullBio}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h4 class="section-title">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                            </svg>
                            Formación Académica
                        </h4>
                        <ul class="education-list">
                            ${o.education.map(s=>`
                                <li class="education-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="20,6 9,17 4,12"/>
                                    </svg>
                                    ${s}
                                </li>
                            `).join("")}
                        </ul>
                    </div>
                    
                    <div class="modal-section">
                        <h4 class="section-title">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            Especialidades
                        </h4>
                        <div class="specialties-grid">
                            ${o.specialties.map(s=>`
                                <span class="specialty-tag">${s}</span>
                            `).join("")}
                        </div>
                    </div>
                </div>
            `;if(c)c.innerHTML=t,console.log("Modal content set");else{console.error("Modal content element not found");return}i?(i.classList.add("is-open"),i.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden",console.log("Modal opened, classes:",i.className),i.offsetHeight,setTimeout(()=>{const s=window.getComputedStyle(i);console.log("Modal display:",s.display),console.log("Modal opacity:",s.opacity),console.log("Modal z-index:",s.zIndex)},100)):console.error("Modal element not found")}function m(){i?.classList.remove("is-open"),i?.setAttribute("aria-hidden","true"),document.body.style.overflow=""}l.forEach((e,o)=>{const a=e.querySelector(".team-image-container"),n=e.querySelector(".team-banner");console.log(`Setting up card ${o}`),a&&(a.addEventListener("click",function(t){console.log("Image clicked on card",o),t.preventDefault(),t.stopPropagation(),d(e)}),a.style.cursor="pointer"),n&&(n.addEventListener("click",function(t){console.log("Banner clicked on card",o),t.preventDefault(),t.stopPropagation(),d(e)}),n.style.cursor="pointer")}),document.addEventListener("click",function(e){console.log("Document click detected on:",e.target);const o=e.target.closest(".team-info-btn");if(o){console.log("Detail button clicked:",o),e.preventDefault(),e.stopPropagation();const t=o.getAttribute("data-member");console.log("Member ID:",t),t&&r(t);return}if(e.target.closest(".team-modal-close")||e.target.classList.contains("team-modal-backdrop")){console.log("Close modal clicked"),m();return}if(window.innerWidth>768)return;e.target?.closest(".team-card")||(console.log("Clicking outside, closing all"),l.forEach(t=>{t.classList.remove("active")}))}),document.addEventListener("keydown",function(e){e.key==="Escape"&&i?.classList.contains("is-open")&&m()});const u=document.querySelectorAll(".team-info-btn");console.log("Found detail buttons:",u.length),u.forEach((e,o)=>{console.log(`Setting up button ${o}:`,e),e.addEventListener("click",function(a){console.log("Direct button click event:",this),a.preventDefault(),a.stopPropagation();const n=this.getAttribute("data-member");console.log("Member ID from button:",n),n&&r(n)})}),console.log("Team toggle and modal initialized with",l.length,"cards"),setTimeout(()=>{console.log("Testing modal functionality...");const e=document.querySelector('[data-member="sofia"]');e?console.log("Found Sofia button:",e):console.log("Sofia button not found")},2e3),window.testModal=function(e){console.log("Manual test for member:",e),r(e)},window.checkModal=function(){console.log("Modal element:",i),console.log("Modal content:",c),console.log("Modal classes:",i?.className)}});
