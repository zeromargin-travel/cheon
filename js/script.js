document.addEventListener('DOMContentLoaded', () => {
    

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

});

// URL Copy function
function copyShareUrl() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert("Link gekopieerd naar klembord! (URLをコピーしました)");
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Web Share API function
function nativeShare() {
    if (navigator.share) {
        const pageTitle = document.title || "Shiatsu Massage Iyashi";
        const metaDescElement = document.querySelector('meta[name="description"]');
        const pageDesc = metaDescElement ? metaDescElement.getAttribute("content") : "";

        navigator.share({
            title: pageTitle,
            text: pageDesc,
            url: window.location.href,
        }).catch(console.error);
    } else {
        copyShareUrl();
    }
}


// Favorite / Add to Homescreen Logic
document.addEventListener("DOMContentLoaded", () => {
    const favBtns = document.querySelectorAll(".floating-fav-btn, .inline-fav-btn");
    if (favBtns.length === 0) return;
    
    const isSaved = localStorage.getItem("iyashi_favorite");
    favBtns.forEach(btn => {
        if (isSaved) btn.classList.add("active");
        
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (!btn.classList.contains("active")) {
                favBtns.forEach(b => b.classList.add("active"));
                localStorage.setItem("iyashi_favorite", "true");
            }
            showToast();
        });
    });
});

function showToast() {
    let toast = document.getElementById("fav-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "fav-toast";
        toast.className = "toast-notification";
        document.body.appendChild(toast);
    }
    
    toast.style.cssText = "position: fixed !important; top: 80px !important; bottom: auto !important; left: 50% !important; transform: translateX(-50%) !important; background: rgba(0, 0, 0, 0.94) !important; color: white !important; padding: 16px 24px !important; border-radius: 20px !important; font-size: 14px !important; z-index: 2147483648 !important; text-align: center !important; width: 90% !important; max-width: 400px !important; box-shadow: 0 10px 30px rgba(0,0,0,0.35) !important; line-height: 1.5 !important; border: 1px solid rgba(255, 255, 255, 0.2) !important;";

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isGerman = window.location.pathname.includes("/de/");
    let message = "";
    let title = isGerman ? "📲 Zum Startbildschirm hinzufügen" : "📲 Toevoegen aan startscherm";
    
    if (/android/i.test(userAgent)) {
        message = isGerman ? 
            "Tippen Sie oben rechts auf <b>[⋮]</b> und dann auf<br><b>Zum Startbildschirm hinzufügen</b>!" : 
            "Tik rechtsboven op <b>[⋮]</b> en kies<br><b>Toevoegen aan startscherm</b>!";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        message = isGerman ? 
            "Tippen Sie unten auf Teilen <b>[↑]</b> und dann auf<br><b>Zum Startbildschirm hinzufügen</b>!" : 
            "Tik onderaan op delen <b>[↑]</b> en kies<br><b>Zet op beginscherm</b>!";
    } else {
        message = isGerman ? 
            "Klicken Sie auf das <b>⭐-Symbol</b> in Ihrem Browser<br>oder drücken Sie <b>Ctrl+D</b> (Mac: Cmd+D)!" :
            "Klik op het <b>⭐-icoon</b> in uw browser<br>of druk op <b>Ctrl+D</b> (Mac: Cmd+D)!";
    }
    
    toast.style.cssText = "position: fixed !important; top: 80px !important; bottom: auto !important; left: 50% !important; transform: translateX(-50%) !important; background: rgba(0, 0, 0, 0.94) !important; color: white !important; padding: 16px 24px !important; border-radius: 20px !important; font-size: 14px !important; z-index: 2147483648 !important; text-align: center !important; width: 90% !important; max-width: 400px !important; box-shadow: 0 10px 30px rgba(0,0,0,0.35) !important; line-height: 1.5 !important; border: 1px solid rgba(255, 255, 255, 0.2) !important;";
    toast.innerHTML = `<b>${title}</b><br><span style="font-size: 0.9rem;">${message}</span>`;
    toast.classList.add("show");
    
    if (window.toastTimeout) clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 4500);
}
