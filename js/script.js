const emailModal = document.getElementById('emailModal');
const closeModal = document.getElementById('closeModal');
const emailForm = document.getElementById('emailForm');
const modalStatus = document.getElementById('modalStatus');

let pdfToDownload = ''; // guarda qual PDF liberar depois do envio

document.querySelectorAll('.download-card .btn-download').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.dataset.product;

        if (product === 'jazz-licks-free') {
            pdfToDownload = 'pdf/jazz-licks-free.pdf';
            emailModal.classList.add('active');
        } else {
            // Produtos pagos vão direto pro link de pagamento
            window.location.href = 'https://seu-link-de-pagamento.com/' + product;
        }
    });
});

closeModal.addEventListener('click', () => {
    emailModal.classList.remove('active');
});

emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;

    modalStatus.textContent = 'Enviando...';

    try {
        // Troque pela sua URL do Formspree (ex: https://formspree.io/f/xxxxxxx)
        const response = await fetch('https://formspree.io/f/xjgnnkne', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, origem: 'Download Free PDF' })
        });

        if (response.ok) {
    modalStatus.textContent = 'Enviado! Baixando seu PDF...';
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = pdfToDownload;
        link.download = 'jazz-licks-free.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        emailModal.classList.remove('active');
        emailForm.reset();
        modalStatus.textContent = '';
    }, 1000);
    
    } else {
            modalStatus.textContent = 'Erro ao enviar. Tente novamente.';
        }
    } catch (error) {
        modalStatus.textContent = 'Erro de conexão. Tente novamente.';
    }
});

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fecha o menu automaticamente ao clicar em um link
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

async function loadLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        const translations = await response.json();

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });

        document.getElementById('langPT').classList.toggle('active-lang', lang === 'pt');
        document.getElementById('langEN').classList.toggle('active-lang', lang === 'en');

        localStorage.setItem('preferredLang', lang);
    } catch (error) {
        console.error('Erro ao carregar idioma:', error);
    }
}

document.getElementById('langPT').addEventListener('click', () => loadLanguage('pt'));
document.getElementById('langEN').addEventListener('click', () => loadLanguage('en'));

// Carrega o idioma salvo (ou português como padrão)
const savedLang = localStorage.getItem('preferredLang') || 'pt';
loadLanguage(savedLang);