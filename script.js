// ==========================================================================
// COPA BOYZ 2025-26 - Cinematic Memories JS
// ==========================================================================

// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    smooth: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Custom Cursor Centering and Hover Scaling
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot || cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Apply coordinates + centering offset translate (-50%, -50%)
        if (cursorDot) {
            cursorDot.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
        }
        if (cursorOutline) {
            cursorOutline.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
        }
    });

    // Apply cursor-hover class to body on interactive elements
    const hoverSelectors = 'a, .btn, .gallery-wall-item, .member-card, .joke-card, .confess-card, .play-btn-large, video, .modal-nav-btn, .modal-close, .bgm-control-btn, .control-btn, .video-progress-container';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverSelectors)) {
            document.body.classList.add('cursor-hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (!e.target.closest(hoverSelectors)) {
            document.body.classList.remove('cursor-hover');
        }
    });
}

// 3. Interactive & Drifting Golden Hour Glow Effect
function initInteractiveGlow() {
    const glowElements = document.querySelectorAll('.glow-bg');
    
    // Slow drifting light leaks
    glowElements.forEach((glow, index) => {
        gsap.to(glow, {
            xPercent: () => Math.random() * 30 - 15,
            yPercent: () => Math.random() * 30 - 15,
            scale: () => Math.random() * 0.3 + 0.85,
            duration: () => Math.random() * 12 + 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    // Mouse movement drift overlay
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        glowElements.forEach((glow, index) => {
            const speed = (index + 1) * 15;
            gsap.to(glow, {
                x: (x - 0.5) * speed,
                y: (y - 0.5) * speed,
                duration: 3,
                ease: "power1.out"
            });
        });
    });
}

// 4. Legends Student Data & Render
const students = [
    { name: "Aditya", tag: "“FEKA FEKI KING 🎬”", img: "ADITYA.jpeg" },
    { name: "Tushar", tag: "“BLACK BEAUTY 💻”", img: "Tushar.jpeg" },
    { name: "Bhushan", tag: "“OVERACTING KING 😂”", img: "bhushan.jpeg" },
    { name: "Bhavesh", tag: "“KAY MZ COMPANY 😭”", img: "bhavesh.jpeg" },
    { name: "Yashwant", tag: "“Always chill mode 😎”", img: "Yashwant.jpeg" },
    { name: "Yash", tag: "“TRIPYA BOSS 🎥”", img: "yash.jpeg" },
    { name: "Prashant", tag: "“CLEANER BOY 🧼”", img: "Prashant.jpeg" },
    { name: "Parthmesh", tag: "“DAIRY DON 😁”", img: "Parthmesh.jpeg" },
    { name: "Prerit", tag: "“FUKTA DARINIDA 😭”", img: "Prerit.jpeg" },
    { name: "Faizan", tag: "“BAKVAS MEME FACTORY 😂”", img: "faizan.jpeg" },
    { name: "Mohsin", tag: "“BHARRAKKE LE RAHA 🌙”", img: "mohsin.jpeg" },
    { name: "Sajid", tag: "“FIGHTING ANY TIME ⚔️”", img: "sajid.jpeg" },
    { name: "Danish", tag: "“Calm outside, panic inside 😭”", img: "danish.jpeg" },
    { name: "Tushar 2", tag: "“PSYCHO BOY 🤣”", img: "tushar2.jpeg" },
    { name: "Talif", tag: "“Hidden talent unlocked 🔥”", img: "talif.jpeg" },
    { name: "Rohan", tag: "“KHUD KO CR BOLNE WALA 👑”", img: "rohan.jpeg" },
    { name: "Tejas", tag: "“KISI SE BHI BAAT NA KARNE WALA ⚡”", img: "tejas.jpeg" },
    { name: "Devanshu", tag: "“ANIME KA 14 🚀”", img: "devanshu.jpeg" },
    { name: "Harshal", tag: "“MANGAL VIRUS 😂”", img: "harshal.jpeg" },
    { name: "Aditya 2", tag: "“BINA SHHPTTI CHA KOLHA 😭”", img: "Aditya2.jpeg" }
];

const batchGrid = document.querySelector('.batch-grid');
if (batchGrid) {
    students.forEach(student => {
        const memberHTML = `
            <div class="member-card glass-panel">
                <div class="member-pic">
                    <img src="${student.img}" class="member-photo" alt="${student.name}" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;300&quot; height=&quot;400&quot; viewBox=&quot;0 0 300 400&quot;><rect width=&quot;100%&quot; height=&quot;100%&quot; fill=&quot;%23090909&quot;/><circle cx=&quot;150&quot; cy=&quot;150&quot; r=&quot;55&quot; fill=&quot;none&quot; stroke=&quot;%23FF7E40&quot; stroke-width=&quot;3&quot;/><path d=&quot;M75 300 Q150 210 225 300&quot; fill=&quot;none&quot; stroke=&quot;%23FF7E40&quot; stroke-width=&quot;3&quot;/></svg>';">
                </div>
                <h3 class="member-name">${student.name}</h3>
                <p class="member-tag">${student.tag}</p>
            </div>
        `;
        batchGrid.insertAdjacentHTML('beforeend', memberHTML);
    });
}

// 5. Floating Particles Generation & Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.top = `${posY}vh`;
        particle.style.opacity = Math.random() * 0.6 + 0.1;
        
        particlesContainer.appendChild(particle);

        gsap.to(particle, {
            y: `-=${Math.random() * 300 + 100}`,
            x: `+=${Math.random() * 150 - 75}`,
            rotation: 360,
            duration: duration,
            delay: delay,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

// 6. Farewell Reel Video Playback Controls
function initReelPlayer() {
    const container = document.querySelector('.reel-container');
    const playBtnLarge = document.querySelector('.play-btn-large');
    const video = document.getElementById('farewell-video');
    const reelOverlay = document.querySelector('.reel-overlay');
    
    if (!video || !container) return;
    
    const playPauseBtn = container.querySelector('.play-pause-btn');
    const skipBackBtn = container.querySelector('.skip-back-btn');
    const skipForwardBtn = container.querySelector('.skip-forward-btn');
    const volumeBtn = container.querySelector('.volume-btn');
    const volumeSlider = container.querySelector('.volume-slider');
    const timeDisplay = container.querySelector('.video-time');
    const progressContainer = container.querySelector('.video-progress-container');
    const progressBar = container.querySelector('.video-progress-bar');
    const fullscreenBtn = container.querySelector('.fullscreen-btn');

    const togglePlay = () => {
        if (video.paused) {
            video.play();
            if (playBtnLarge) {
                playBtnLarge.style.opacity = '0';
                playBtnLarge.style.pointerEvents = 'none';
            }
            if (reelOverlay) {
                reelOverlay.style.opacity = '0';
                reelOverlay.style.pointerEvents = 'none';
            }
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            if (playBtnLarge) {
                playBtnLarge.style.opacity = '1';
                playBtnLarge.style.pointerEvents = 'auto';
            }
            if (reelOverlay) {
                reelOverlay.style.opacity = '1';
                reelOverlay.style.pointerEvents = 'auto';
            }
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    };

    if (playBtnLarge) {
        playBtnLarge.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlay();
        });
    }

    video.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
    });

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlay();
        });
    }

    if (skipBackBtn) {
        skipBackBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            video.currentTime = Math.max(0, video.currentTime - 10);
        });
    }
    if (skipForwardBtn) {
        skipForwardBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
        });
    }

    let lastVolume = 1;
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            e.stopPropagation();
            video.volume = volumeSlider.value;
            video.muted = video.volume === 0;
            updateVolumeIcon();
        });
    }

    const updateVolumeIcon = () => {
        if (video.muted || video.volume === 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (video.volume < 0.5) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    };

    if (volumeBtn) {
        volumeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (video.muted) {
                video.muted = false;
                video.volume = lastVolume;
                if (volumeSlider) volumeSlider.value = lastVolume;
            } else {
                lastVolume = video.volume > 0 ? video.volume : 1;
                video.muted = true;
                if (volumeSlider) volumeSlider.value = 0;
            }
            updateVolumeIcon();
        });
    }

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    video.addEventListener('timeupdate', () => {
        if (video.duration) {
            const percentage = (video.currentTime / video.duration) * 100;
            if (progressBar) progressBar.style.width = `${percentage}%`;
            if (timeDisplay) {
                timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
            }
        }
    });

    video.addEventListener('loadedmetadata', () => {
        if (timeDisplay) {
            timeDisplay.textContent = `0:00 / ${formatTime(video.duration)}`;
        }
    });

    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        });
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                console.error(`Error fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFullscreen();
        });
    }

    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement === container) {
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            container.classList.add('fullscreen-active');
        } else {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            container.classList.remove('fullscreen-active');
        }
    });

    video.addEventListener('ended', () => {
        if (playBtnLarge) {
            playBtnLarge.style.opacity = '1';
            playBtnLarge.style.pointerEvents = 'auto';
        }
        if (reelOverlay) {
            reelOverlay.style.opacity = '1';
            reelOverlay.style.pointerEvents = 'auto';
        }
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
}

// ==========================================================================
// DYNAMIC GALLERY SYSTEM - Apple / Pinterest / Netflix Inspired
// ==========================================================================

// Unified dynamic gallery array containing only actual existing local images on disk
const galleryImages = [
    // Squad / Group
    "group1.jpeg", "group2.jpeg", "group3.jpeg", "group4.jpeg", "group5.jpeg", "group6.jpeg",
    "group7.jpeg", "group8.jpeg", "group9.jpeg", "group10.jpeg", "group11.jpeg", "group12.jpeg",
    "group13.jpeg", "group14.jpeg", "group15.jpeg", "group16.jpeg", "group17.jpeg", "group18.jpeg",
    "group19.jpeg", "group20.jpeg", "group21.jpeg", "group22.jpeg", "group23.jpeg", "group24.jpeg",
    "group25.jpeg", "group26.jpeg", "group27.jpeg", "group28.jpeg", "group29.jpeg", "group30.jpeg",
    "group31.jpeg", "group32.jpeg", "group33.jpeg", "group34.jpeg", "group35.jpeg", "group36.jpeg",
    "group37.jpeg", "group38.jpeg", "group39.jpeg", "group40.jpeg", "group41.jpeg", "group42.jpeg",
    "group43.jpeg", "group44.jpeg", "group45.jpeg", "group46.jpeg", "group47.jpeg", "group48.jpeg",
    "group49.jpeg", "group50.jpeg", "group51.jpeg", "group52.jpeg", "group53.jpeg", "group54.jpeg",
    "group55.jpeg", "group56.jpeg", "group57.jpeg", "group58.jpeg", "group59.jpeg", "group60.jpeg",
    
    // Trips
    "trip1.jpeg", "trip2.jpeg", "trip3.jpeg", "trip4.jpeg", "trip11.jpeg", "trip12.jpeg",
    "trip13.jpeg", "trip14.jpeg", "trip15.jpeg", "trip16.jpeg", "trip17.jpeg", "trip18.jpeg",
    "trip19.jpeg", "trip20.jpeg", "trip21.jpeg", "trip22.jpeg", "trip23.jpeg", "trip24.jpeg",
    "trip25.jpeg",

    // Labs
    "lab11.jpeg", "lab12.jpeg", "lab13.jpeg", "lab14.jpeg", "lab15.jpeg", "lab16.jpeg",
    "lab17.jpeg", "lab18.jpeg", "lab19.jpeg", "lab20.jpeg",

    // Canteen
    "canteen11.jpeg", "canteen12.jpeg", "canteen13.jpeg", "canteen14.jpeg", "canteen15.jpeg",
    "canteen16.jpeg", "canteen17.jpeg", "canteen18.jpeg", "canteen19.jpeg", "canteen20.jpeg",

    // Memories
    "memory1.jpeg", "memory2.jpeg", "memory3.jpeg", "memory4.jpeg", "memory5.jpeg", "memory6.jpeg",
    "memory7.jpeg", "memory11.jpeg", "memory12.jpeg", "memory13.jpeg", "memory14.jpeg", "memory15.jpeg",
    "memory16.jpeg", "memory17.jpeg", "memory18.jpeg", "memory19.jpeg", "memory20.jpeg", "memory21.jpeg",
    "memory22.jpeg", "memory23.jpeg", "memory24.jpeg", "memory25.jpeg",

    // Boys
    "boys1.jpeg", "boys2.jpeg", "boys3.jpeg", "boys4.jpeg", "boys5.jpeg", "boys6.jpeg",
    "boys7.jpeg", "boys8.jpeg", "boys9.jpeg", "boys10.jpeg", "boys11.jpeg", "boys12.jpeg",
    "boys13.jpeg", "boys14.jpeg", "boys15.jpeg", "boys16.jpeg", "boys17.jpeg", "boys18.jpeg",
    "boys19.jpeg", "boys20.jpeg",

    // Class
    "class1.jpeg", "class2.jpeg", "class3.jpeg", "class4.jpeg", "class5.jpeg", "class6.jpeg",
    "class11.jpeg", "class12.jpeg", "class13.jpeg", "class14.jpeg", "class15.jpeg", "class16.jpeg",
    "class17.jpeg", "class18.jpeg", "class19.jpeg", "class20.jpeg",

    // Farewell
    "farewell1.jpeg", "farewell2.jpeg", "farewell3.jpeg", "farewell4.jpeg", "farewell5.jpeg", "farewell6.jpeg",
    "farewell7.jpeg", "farewell11.jpeg", "farewell12.jpeg", "farewell13.jpeg", "farewell14.jpeg", "farewell15.jpeg",
    "farewell16.jpeg", "farewell17.jpeg", "farewell18.jpeg", "farewell19.jpeg", "farewell20.jpeg",

    // Corridor
    "corridor1.jpeg", "corridor2.jpeg", "corridor3.jpeg", "corridor4.jpeg", "corridor5.jpeg", "corridor6.jpeg",
    "corridor11.jpeg", "corridor12.jpeg", "corridor13.jpeg", "corridor14.jpeg", "corridor15.jpeg", "corridor16.jpeg",
    "corridor17.jpeg", "corridor18.jpeg", "corridor19.jpeg", "corridor20.jpeg"
];

// Helper to resolve captions & tags
function getCaptionAndTag(filename) {
    const cleanName = filename.split('.')[0].toLowerCase();
    let caption = "";
    let tag = "";
    
    if (cleanName.startsWith("group")) {
        const num = cleanName.replace("group", "");
        caption = `Squad Memory #${num} ❤️`;
        tag = "COPA Boyz 2025-26";
    } else if (cleanName.startsWith("trip")) {
        const num = cleanName.replace("trip", "");
        caption = `Trip Group Memory #${num} 📍`;
        tag = "Adventure Diary";
    } else if (cleanName.startsWith("lab")) {
        const num = cleanName.replace("lab", "");
        caption = `Lab Chaos #${num} 💻`;
        tag = "Practical Session";
    } else if (cleanName.startsWith("canteen")) {
        const num = cleanName.replace("canteen", "");
        caption = `Canteen Hangout #${num} 🍔`;
        tag = "Cold Drink & Samosa Talks";
    } else if (cleanName.startsWith("farewell")) {
        const num = cleanName.replace("farewell", "");
        caption = `Farewell Moment #${num} 🎬`;
        tag = "The Final Goodbye";
    } else if (cleanName.startsWith("boys")) {
        const num = cleanName.replace("boys", "");
        caption = `Boys Gang #${num} 😎`;
        tag = "COPA Brotherhood";
    } else if (cleanName.startsWith("memory")) {
        const num = cleanName.replace("memory", "");
        caption = `Epic Memory #${num} ✨`;
        tag = "Unforgettable Moment";
    } else if (cleanName.startsWith("class")) {
        const num = cleanName.replace("class", "");
        caption = `Classroom Vibe #${num} 📚`;
        tag = "Theory Escape Plan";
    } else if (cleanName.startsWith("corridor")) {
        const num = cleanName.replace("corridor", "");
        caption = `Corridor Masti #${num} 🚶`;
        tag = "Walks & Talks";
    } else {
        caption = filename.charAt(0).toUpperCase() + filename.slice(1).replace(/[-_]/g, ' ');
        tag = "COPA Memory ✨";
    }
    
    return { caption, tag };
}

let activeImages = []; // Stores successfully initialized gallery objects
let loadedCount = 0;
let counterTimer;

let refreshTimer;
function debouncedRefresh() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 150);
}

// Build Grid with Dynamic Size-Hierarchy Assignment
function renderPremiumGallery() {
    const wall = document.getElementById('premium-gallery-wall');
    if (!wall) return;

    wall.innerHTML = '';
    activeImages = [];
    loadedCount = 0;

    // De-duplicate array
    const uniqueImages = Array.from(new Set(galleryImages));

    uniqueImages.forEach((imgSrc, index) => {
        const { caption, tag } = getCaptionAndTag(imgSrc);

        const cleanName = imgSrc.split('.')[0].toLowerCase();
        let sizeClass = "small";

        if (cleanName.startsWith("group") || cleanName.startsWith("farewell")) {
            sizeClass = "large";
        } else if (cleanName.startsWith("boys")) {
            const num = parseInt(cleanName.replace("boys", "")) || 0;
            // Divisible by 3 are LARGE hero memories, others are SMALL
            sizeClass = (num % 3 === 0) ? "large" : "small";
        } else if (cleanName.startsWith("class") || cleanName.startsWith("lab") || cleanName.startsWith("corridor")) {
            sizeClass = "medium";
        } else if (cleanName.startsWith("canteen") || cleanName.startsWith("trip")) {
            sizeClass = "small";
        } else if (cleanName.startsWith("memory")) {
            const num = parseInt(cleanName.replace("memory", "")) || 0;
            // Even-numbered memories are MEDIUM, odd-numbered are SMALL
            sizeClass = (num % 2 === 0) ? "medium" : "small";
        } else {
            sizeClass = "small";
        }

        // 1. Create card container
        const card = document.createElement('div');
        card.className = `gallery-wall-item ${sizeClass}`.trim();
        card.setAttribute('data-caption', caption);
        card.setAttribute('data-tag', tag);

        // 2. Create image element
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = caption;
        img.loading = 'lazy';

        // Intelligent vertical cropping to keep faces in-frame under cover positioning
        if (cleanName.startsWith("farewell") || cleanName.startsWith("boys")) {
            img.style.objectPosition = "center 20%";
        }

        // Helper to refresh trigger alignments on load
        img.onload = () => {
            debouncedRefresh();
        };

        // 3. Fallback handler for missing photos - remove card entirely
        img.onerror = () => {
            card.remove();
            const idx = activeImages.findIndex(x => x.filename === imgSrc);
            if (idx > -1) {
                activeImages.splice(idx, 1);
            }
            incrementLoadedCount();
            debouncedRefresh();
        };

        // 4. Create hover text overlay
        const overlay = document.createElement('div');
        overlay.className = 'gallery-wall-overlay';
        overlay.innerHTML = `
            <div class="gallery-item-caption">${caption}</div>
            <div class="gallery-item-tag"><i class="fa-solid fa-heart"></i> ${tag}</div>
        `;

        card.appendChild(img);
        card.appendChild(overlay);
        wall.appendChild(card);

        // Track array index for modal navigation
        activeImages.push({
            filename: imgSrc,
            caption: caption,
            tag: tag,
            element: card,
            imageElement: img
        });

        // Click to view modal with dynamic index mapping
        card.addEventListener('click', () => {
            const actualIndex = activeImages.findIndex(x => x.filename === imgSrc);
            if (actualIndex > -1) {
                openLightbox(actualIndex);
            }
        });

        incrementLoadedCount();
    });
}

function incrementLoadedCount() {
    loadedCount = activeImages.length;
    clearTimeout(counterTimer);
    counterTimer = setTimeout(() => {
        animateMemoriesCounter(loadedCount);
    }, 250);
}

function animateMemoriesCounter(targetVal) {
    const counterEl = document.getElementById('memories-count');
    if (!counterEl) return;
    
    gsap.fromTo(counterEl, 
        { textContent: 0 }, 
        { 
            textContent: targetVal, 
            duration: 1.6, 
            snap: { textContent: 1 }, 
            ease: "power2.out"
        }
    );
}

// Live Search Filter functionality
function initPremiumSearch() {
    const searchInput = document.getElementById('gallery-search');
    const clearBtn = document.getElementById('search-clear-btn');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        
        if (val !== "") {
            clearBtn.classList.add('active');
        } else {
            clearBtn.classList.remove('active');
        }

        activeImages.forEach((imgData) => {
            const caption = imgData.caption.toLowerCase();
            const tag = imgData.tag.toLowerCase();
            
            if (caption.includes(val) || tag.includes(val)) {
                imgData.element.style.display = '';
                gsap.to(imgData.element, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" });
            } else {
                gsap.to(imgData.element, { 
                    opacity: 0, 
                    scale: 0.95, 
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        imgData.element.style.display = 'none';
                    }
                });
            }
        });
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = "";
        clearBtn.classList.remove('active');
        activeImages.forEach(imgData => {
            imgData.element.style.display = '';
            gsap.to(imgData.element, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" });
        });
    });
}

// Lightbox Modal controller
let currentLightboxIndex = 0;

function openLightbox(index) {
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalCounter = document.getElementById('modal-counter');
    if (!modal || !modalImg) return;

    const visibleImages = activeImages.filter(img => img.element.style.display !== 'none');
    const activeData = activeImages[index];
    if (!activeData) return;
    
    const currentVisibleIdx = visibleImages.findIndex(img => img.filename === activeData.filename);
    currentLightboxIndex = currentVisibleIdx >= 0 ? currentVisibleIdx : 0;
    
    const currentData = visibleImages[currentLightboxIndex];
    if (!currentData) return;

    modalImg.src = currentData.filename;
    modalCaption.textContent = currentData.caption;
    modalCounter.textContent = `${currentLightboxIndex + 1} of ${visibleImages.length}`;

    modal.classList.add('active');

    // Kill any ongoing tweens
    gsap.killTweensOf([modal, modalImg, '.modal-nav-btn', '.modal-close', '.modal-caption-bar']);

    // Set initial states
    gsap.set(modal, { display: 'flex', opacity: 0 });
    gsap.set(modalImg, { scale: 0.9, opacity: 0, y: 30 });
    gsap.set(['.modal-nav-btn', '.modal-close', '.modal-caption-bar'], { opacity: 0, y: 15 });

    // GSAP Timeline animation
    gsap.timeline()
        .to(modal, { opacity: 1, duration: 0.45, ease: "power2.out" })
        .to(modalImg, { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: "power4.out" }, "-=0.25")
        .to(['.modal-nav-btn', '.modal-close', '.modal-caption-bar'], { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }, "-=0.35");
}

function closeLightbox() {
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    if (!modal || !modalImg) return;

    gsap.killTweensOf([modal, modalImg, '.modal-nav-btn', '.modal-close', '.modal-caption-bar']);

    gsap.timeline({
        onComplete: () => {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
    })
    .to(['.modal-nav-btn', '.modal-close', '.modal-caption-bar'], { opacity: 0, y: -10, duration: 0.25, ease: "power2.in" })
    .to(modalImg, { scale: 0.9, opacity: 0, y: -20, duration: 0.3, ease: "power2.in" }, "-=0.15")
    .to(modal, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.2");
}

function navigateLightbox(direction) {
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalCounter = document.getElementById('modal-counter');
    if (!modalImg) return;

    const visibleImages = activeImages.filter(img => img.element.style.display !== 'none');
    if (visibleImages.length === 0) return;

    let nextIdx = currentLightboxIndex + direction;
    if (nextIdx >= visibleImages.length) nextIdx = 0;
    if (nextIdx < 0) nextIdx = visibleImages.length - 1;

    currentLightboxIndex = nextIdx;
    const data = visibleImages[nextIdx];

    gsap.killTweensOf(modalImg);

    // Cinematic crossfade transition slide effect
    gsap.to(modalImg, {
        opacity: 0,
        x: direction * -30,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
            modalImg.src = data.filename;
            modalCaption.textContent = data.caption;
            modalCounter.textContent = `${nextIdx + 1} of ${visibleImages.length}`;

            gsap.fromTo(modalImg, 
                { opacity: 0, x: direction * 30, scale: 0.95 },
                { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: "power3.out" }
            );
        }
    });
}

function initLightboxListeners() {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = document.getElementById('modal-close');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');
    if (!modal) return;

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-content-wrapper')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') navigateLightbox(1);
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
    });

    // Touch Swiping support
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 60;
        if (touchEndX < touchStartX - swipeThreshold) {
            navigateLightbox(1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            navigateLightbox(-1);
        }
    }, { passive: true });
}

// ==========================================================================
// GSAP ENTRANCE & SCROLLTRIGGER ANIMATIONS
// ==========================================================================
gsap.registerPlugin(ScrollTrigger);

function initHeroAnimations() {
    const heroTimeline = gsap.timeline();

    heroTimeline.fromTo(".hero-title", 
        { y: 50, opacity: 0, scale: 0.9, filter: "blur(10px)" },
        { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power4.out" }
    )
    .fromTo(".hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=1"
    )
    .fromTo(".hero-buttons .btn",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
        "-=0.5"
    );

    gsap.to(".hero-content", {
        yPercent: 40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}

function initScrollAnimations() {
    // Timeline Cards Reveal - smooth drift and subtle blur
    gsap.utils.toArray('.t-item').forEach((item, i) => {
        const direction = i % 2 === 0 ? -40 : 40;
        const card = item.querySelector('.t-card');
        const dot = item.querySelector('.t-dot');

        if (card) {
            gsap.fromTo(card,
                { x: direction, y: 20, opacity: 0, scale: 0.95, filter: "blur(8px)" },
                {
                    x: 0, y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out",
                    scrollTrigger: { trigger: item, start: "top 85%" }
                }
            );
        }
        if (dot) {
            gsap.fromTo(dot,
                { scale: 0, opacity: 0 },
                {
                    scale: 1, opacity: 1, duration: 0.8, delay: 0.4, ease: "back.out(2)",
                    scrollTrigger: { trigger: item, start: "top 85%" }
                }
            );
        }
    });

    // Legends Member Card Reveal - elegant staggered fade in and slide up
    gsap.fromTo('.member-card', 
        { y: 60, opacity: 0, scale: 0.96, filter: "blur(8px)" },
        {
            scrollTrigger: {
                trigger: '.members-section',
                start: 'top 80%'
            },
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.06,
            duration: 1.4,
            ease: "power3.out"
        }
    );

    // Gallery Items Reveal
    gsap.fromTo('.gallery-wall-item', 
        { y: 50, opacity: 0, scale: 0.96, filter: "blur(8px)" },
        {
            scrollTrigger: {
                trigger: '.gallery-section',
                start: 'top 80%'
            },
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.05,
            duration: 1.4,
            ease: "power3.out"
        }
    );

    // Teacher Tribute Card Reveal
    gsap.fromTo(".tribute-card",
        { y: 60, opacity: 0, scale: 0.97, filter: "blur(10px)" },
        {
            y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.6, ease: "power4.out",
            scrollTrigger: { trigger: ".tribute-section", start: "top 80%" }
        }
    );

    // Farewell Reel Container Reveal
    gsap.fromTo(".reel-container",
        { y: 50, opacity: 0, scale: 0.97, filter: "blur(8px)" },
        {
            y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out",
            scrollTrigger: { trigger: ".reel-section", start: "top 80%" }
        }
    );

    // Inside Jokes & Confessions reveal
    gsap.utils.toArray('.joke-card, .confess-card').forEach((el) => {
        gsap.fromTo(el,
            { y: 40, opacity: 0, filter: "blur(6px)" },
            {
                y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 88%" }
            }
        );
    });

    // Footer Credits Reveal
    gsap.fromTo(".footer-credit",
        { y: 30, opacity: 0, filter: "blur(5px)" },
        {
            y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out",
            scrollTrigger: { trigger: ".luxury-footer", start: "top 92%" }
        }
    );

    // Floating Micro-Animations
    gsap.to(".bgm-control-btn", {
        y: -6,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    gsap.to(".play-btn-large", {
        scale: 1.06,
        y: -4,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    gsap.to(".scroll-indicator", {
        y: 8,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// BGM Controller
function initBGM() {
    const bgm = new Audio('bgm.mp3');
    bgm.loop = true;
    bgm.volume = 0.45;
    
    const bgmControl = document.getElementById('bgm-control');
    let isPlaying = false;
    
    const startAudio = () => {
        if (!isPlaying) {
            bgm.play().then(() => {
                isPlaying = true;
                if (bgmControl) bgmControl.classList.add('playing');
            }).catch(err => {
                console.log("Autoplay blocked or waiting for user interaction.", err);
            });
        }
        document.removeEventListener('click', startAudio);
        document.removeEventListener('keydown', startAudio);
        document.removeEventListener('touchstart', startAudio);
        document.removeEventListener('scroll', startAudio);
    };

    document.addEventListener('click', startAudio);
    document.addEventListener('keydown', startAudio);
    document.addEventListener('touchstart', startAudio);
    document.addEventListener('scroll', startAudio);

    if (bgmControl) {
        bgmControl.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPlaying) {
                bgm.pause();
                isPlaying = false;
                bgmControl.classList.remove('playing');
            } else {
                bgm.play().then(() => {
                    isPlaying = true;
                    bgmControl.classList.add('playing');
                }).catch(err => console.error(err));
            }
        });
    }
}

// Camera Flash Animation Loop
function initCameraFlashes() {
    const flashEl = document.querySelector('.camera-flash');
    if (!flashEl) return;
    
    const triggerFlash = () => {
        const duration = Math.random() * 0.5 + 0.25;
        const opacity = Math.random() * 0.12 + 0.04;
        
        gsap.timeline()
            .to(flashEl, { opacity: opacity, duration: 0.06, ease: "power2.out" })
            .to(flashEl, { opacity: 0, duration: duration, ease: "power2.in" });
            
        setTimeout(triggerFlash, Math.random() * 8000 + 5000); // every 5-13 seconds
    };
    
    setTimeout(triggerFlash, 2500);
}

// 9. Boot all components on DOM load
document.addEventListener("DOMContentLoaded", () => {
    createParticles();
    initReelPlayer();
    initHeroAnimations();
    initInteractiveGlow();
    initBGM();
    initCameraFlashes();

    // Mount premium dynamic gallery & listeners
    renderPremiumGallery();
    initPremiumSearch();
    initLightboxListeners();

    // Stagger reveals slightly
    setTimeout(initScrollAnimations, 200);
});
