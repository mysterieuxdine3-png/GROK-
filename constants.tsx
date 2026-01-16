
import React from 'react';
import { VideoItem, PDFResource } from './types';

export const COLORS = {
  primary: '#00ff99',
  secondary: '#3b82f6',
  premium: '#facc15',
  bg: '#050505',
  card: '#0f0f0f',
  border: '#1a1a1a',
};

export const MAIN_COURSE_PLAYLIST: VideoItem[] = [
  {
    id: 'm1',
    youtubeId: 'X3KCX99I2pQ',
    title: 'Module 01 : Introduction & Configuration',
    description: 'Démarrage du projet, installation des dépendances et architecture globale.',
    level: 'Débutant'
  },
  {
    id: 'm2',
    youtubeId: 'Fc9CQVF4vwE',
    title: 'Module 02 : Architecture UI',
    description: 'Conception des interfaces et des composants réutilisables.',
    level: 'Intermédiaire'
  },
  {
    id: 'm3',
    youtubeId: 'EFxpl3vCMyk',
    title: 'Module 03 : Logique Backend',
    description: 'Développement API, intégration de services et gestion des données.',
    level: 'Avancé'
  },
  {
    id: 'm4',
    youtubeId: 'rb2541jPY2o',
    title: 'Module 04 : Finalisation & Déploiement',
    description: 'Optimisation des performances et mise en production.',
    level: 'Expert'
  }
];

export const TUTORIALS: VideoItem[] = [
  {
    id: 't1',
    youtubeId: 'jzN-Do26Umw',
    title: 'Concepts Fondamentaux JavaScript',
    description: 'Maîtrisez les bases essentielles pour bien démarrer votre carrière de dev.',
    level: 'Niveau Débutant'
  },
  {
    id: 't2',
    youtubeId: 'sBws8MSXN7A',
    title: 'Tailwind CSS Modern Mastery',
    description: 'Apprenez à construire des interfaces incroyables rapidement.',
    level: 'Intermédiaire'
  },
  {
    id: 't3',
    youtubeId: 'hQAHSlTtcmY',
    title: 'React Hooks de A à Z',
    description: 'Comprendre useState, useEffect et les hooks personnalisés.',
    level: 'Avancé'
  }
];

export const PDF_RESOURCES: PDFResource[] = [
  {
    id: 'p1',
    title: 'DÉBUTER EN HTML',
    category: 'Squelette & Structure Web',
    icon: 'H',
    color: 'orange',
    topics: ['Tags de base', 'Structure sémantique', 'Formulaires & SEO'],
    link: 'https://drive.google.com/file/d/1634NyrXq9C2Zv6Q6TAfh2cF5xEoxlbm-/view?usp=drive_link'
  },
  {
    id: 'p2',
    title: 'DÉBUTER EN CSS',
    category: 'Style & Design Adaptatif',
    icon: 'C',
    color: 'blue',
    topics: ['Sélecteurs & Box Model', 'Flexbox & Grid', 'Animations CSS3'],
    link: '#'
  },
  {
    id: 'p3',
    title: 'DÉBUTER EN JAVA',
    category: 'POO & Logiciel Robuste',
    icon: 'J',
    color: 'red',
    topics: ['Syntaxe & Variables', 'Classes & Objets', 'Exceptions'],
    link: '#'
  },
  {
    id: 'p4',
    title: 'DÉBUTER EN PYTHON',
    category: 'Scripts & IA',
    icon: 'P',
    color: 'yellow',
    topics: ['Logique & Boucles', 'Listes & Dicts', 'Data Science'],
    link: '#'
  }
];
