document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const timeDisplay = document.getElementById('time');
    const startPauseBtn = document.getElementById('start-pause');
    const resetBtn = document.getElementById('reset');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const soundButtons = document.querySelectorAll('.sound-btn');
    const notification = document.getElementById('notification');
    const closeNotificationBtn = document.getElementById('close-notification');
    
    // Elementos de áudio
    const rainSound = document.getElementById('rain-sound');
    const forestSound = document.getElementById('forest-sound');
    const wavesSound = document.getElementById('waves-sound');
    const fireSound = document.getElementById('fire-sound');
    
    // Variáveis de estado
    let timer;
    let totalSeconds = 5 * 60; // 5 minutos inicialmente
    let isRunning = false;
    let selectedSound = null;
    
    // Inicializa o app
    function init() {
        updateTimeDisplay();
        setupEventListeners();
    }
    
    // Configura os event listeners
    function setupEventListeners() {
        // Botão iniciar/pausar
        startPauseBtn.addEventListener('click', toggleTimer);
        
        // Botão reset
        resetBtn.addEventListener('click', resetTimer);
        
        // Inputs de minutos e segundos
        minutesInput.addEventListener('change', updateTotalSeconds);
        secondsInput.addEventListener('change', updateTotalSeconds);
        
        // Botões de som
        soundButtons.forEach(button => {
            button.addEventListener('click', () => selectSound(button));
        });
        
        // Botão de fechar notificação
        closeNotificationBtn.addEventListener('click', () => {
            notification.style.display = 'none';
        });
    }
    
    // Atualiza o tempo total baseado nos inputs
    function updateTotalSeconds() {
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        totalSeconds = minutes * 60 + seconds;
        updateTimeDisplay();
    }
    
    // Alterna entre iniciar e pausar o timer
    function toggleTimer() {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }
    
    // Inicia o timer
    function startTimer() {
        if (totalSeconds <= 0) return;
        
        isRunning = true;
        startPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        startPauseBtn.classList.add('pulse');
        
        timer = setInterval(() => {
            totalSeconds--;
            updateTimeDisplay();
            
            if (totalSeconds <= 0) {
                finishTimer();
            }
        }, 1000);
    }
    
    // Pausa o timer
    function pauseTimer() {
        isRunning = false;
        clearInterval(timer);
        startPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        startPauseBtn.classList.remove('pulse');
    }
    
    // Reseta o timer
    function resetTimer() {
        pauseTimer();
        updateTotalSeconds();
    }
    
    // Finaliza o timer
    function finishTimer() {
        pauseTimer();
        showNotification();
        stopAllSounds();
    }
    
    // Mostra a notificação de término
    function showNotification() {
        notification.style.display = 'block';
    }
    
    // Atualiza o display do tempo
    function updateTimeDisplay() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Atualiza os inputs para refletir o tempo atual
        minutesInput.value = minutes;
        secondsInput.value = seconds;
    }
    
    // Seleciona um som ambiente
    function selectSound(button) {
        const sound = button.dataset.sound;
        
        // Remove a classe active de todos os botões
        soundButtons.forEach(btn => btn.classList.remove('active'));
        
        // Para todos os sons
        stopAllSounds();
        
        if (sound === 'silence') {
            selectedSound = null;
            return;
        }
        
        // Adiciona a classe active ao botão selecionado
        button.classList.add('active');
        selectedSound = sound;
        
        // Toca o som selecionado
        switch(sound) {
            case 'rain':
                rainSound.play();
                break;
            case 'forest':
                forestSound.play();
                break;
            case 'waves':
                wavesSound.play();
                break;
            case 'fire':
                fireSound.play();
                break;
        }
    }
    
    // Para todos os sons
    function stopAllSounds() {
        rainSound.pause();
        forestSound.pause();
        wavesSound.pause();
        fireSound.pause();
        
        // Volta todos os áudios para o início
        rainSound.currentTime = 0;
        forestSound.currentTime = 0;
        wavesSound.currentTime = 0;
        fireSound.currentTime = 0;
    }
    
    // Inicializa o app
    init();
});