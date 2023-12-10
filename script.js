const boutonDemarrer = document.getElementById('btn-demarrer');
const boutonSuivant = document.getElementById('btn-suivant');
const conteneurQuestionElement = document.getElementById('conteneur-question');
const questionElement = document.getElementById('question');
const boutonsReponseElement = document.getElementById('boutons-reponse');

let questionsMelangees, indexQuestionCourante;

boutonDemarrer.addEventListener('click', demarrerJeu);
boutonSuivant.addEventListener('click', () => {
    indexQuestionCourante++;
    afficherQuestionSuivante();
});

function demarrerJeu() {
    boutonDemarrer.classList.add('cacher');
    questionsMelangees = questions.sort(() => Math.random() - 0.5);
    indexQuestionCourante = 0;
    conteneurQuestionElement.classList.remove('cacher');
    afficherQuestionSuivante();
}

function afficherQuestionSuivante() {
    reinitialiserEtat();
    if (indexQuestionCourante < questionsMelangees.length) {
        afficherQuestion(questionsMelangees[indexQuestionCourante]);
    } else {
        // Tout est bon, redirige
        window.location.href = 'bravo.html';
    }
}

function afficherQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const bouton = document.createElement('button');
        bouton.innerText = answer.text;
        bouton.classList.add('bouton');
        if (answer.correct) {
            bouton.dataset.correct = answer.correct;
        }
        bouton.addEventListener('click', selectionnerReponse);
        boutonsReponseElement.appendChild(bouton);
    });
}

function reinitialiserEtat() {
    boutonSuivant.classList.add('cacher');
    while (boutonsReponseElement.firstChild) {
        boutonsReponseElement.removeChild(boutonsReponseElement.firstChild);
    }
}

function selectionnerReponse(e) {
    const boutonSelectionne = e.target;
    const correct = boutonSelectionne.dataset.correct;
    definirClasseStatus(document.body, correct);
    Array.from(boutonsReponseElement.children).forEach(bouton => {
        definirClasseStatus(bouton, bouton.dataset.correct);
    });
    if (questionsMelangees.length > indexQuestionCourante + 1) {
        boutonSuivant.classList.remove('cacher');
    } else {
        boutonDemarrer.innerText = 'Recommencer';
        boutonDemarrer.classList.remove('cacher');
    }
}

function definirClasseStatus(element, correct) {
    effacerClasseStatus(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function effacerClasseStatus(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: "Que renvoie ce code ? || '' || false || 'Salut'",
        answers: [
            { text: 'Salut', correct: true },
            { text: '0', correct: false },
            { text: 'false', correct: false },
            { text: '``', correct: false }
        ]
    },
    {
        question: "Comment appelle-t-on une fonction qui s'appelle elle-même ?",
        answers: [
            { text: 'Récursion', correct: true },
            { text: 'Inception', correct: false },
            { text: 'Auto-Référence', correct: false },
            { text: 'Peu importe', correct: false }
        ]
    },
    {
        question: "Comment accède-t-on à la valeur de l'attribut de données data-count en JavaScript ?",
        answers: [
            { text: 'element.dataset.count', correct: true },
            { text: 'element.dataAttribute.count', correct: false },
            { text: 'element.dataset.dataCount', correct: false },
            { text: 'element.dataCount', correct: false }
        ]
    }
];
