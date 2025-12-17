import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Service {
    id: string
    title: string
    category: string
    iconName: string // Lucide icon name
    shortDesc: string
    fullDesc: string
    requirements: string[]
    processingTime: string
    cost: string
}

export const useServiceStore = defineStore('services', () => {
    const services = ref<Service[]>([
        {
            id: 'passeport',
            title: 'Passeport Biométrique',
            category: 'Identité',
            iconName: 'BookUser',
            shortDesc: 'Demande de passeport ordinaire ou de service.',
            fullDesc: 'Le passeport biométrique est un document de voyage sécurisé délivré aux citoyens congolais. Il permet de voyager à l\'étranger et sert de preuve d\'identité et de nationalité.',
            requirements: ['Carte d\'identité', 'Preuve de nationalité', '4 Photos passeport', 'Formulaire rempli'],
            processingTime: '7 à 14 jours ouvrables',
            cost: '99 USD'
        },
        {
            id: 'permis-conduire',
            title: 'Permis de Conduire',
            category: 'Transport',
            iconName: 'Car',
            shortDesc: 'Renouvellement et demande de permis.',
            fullDesc: 'Faites votre demande de permis de conduire biométrique sécurisé. Valable pour toutes les catégories de véhicules (A, B, C, D, E).',
            requirements: ['Ancien permis (si renouvellement)', 'Attestation médicale', '2 Photos passeport', 'Certificat d\'auto-école'],
            processingTime: '5 jours ouvrables',
            cost: '40 USD'
        },
        {
            id: 'carte-identite',
            title: 'Carte d\'Identité',
            category: 'Identité',
            iconName: 'IdCard',
            shortDesc: 'Nouvelle carte d\'identité nationale.',
            fullDesc: 'La Carte d\'Identité Nationale (CIN) est obligatoire pour tout citoyen à partir de 18 ans. Elle est valide pour 10 ans.',
            requirements: ['Acte de naissance', 'Certificat de résidence', '3 Photos passeport'],
            processingTime: '30 jours',
            cost: 'Gratuit (première demande)'
        },
        {
            id: 'impot-revenu',
            title: 'Impôt sur le Revenu',
            category: 'Taxes',
            iconName: 'Banknote',
            shortDesc: 'Déclaration et paiement de l\'IPR.',
            fullDesc: 'Déclarez vos revenus annuels et payez votre Impôt Professionnel sur les Rémunérations (IPR) en toute simplicité.',
            requirements: ['Numéro Impôt (NIF)', 'Relevés bancaires', 'Fiches de paie'],
            processingTime: 'Immédiat',
            cost: 'Selon les revenus'
        },
        {
            id: 'casier-judiciaire',
            title: 'Casier Judiciaire',
            category: 'Justice',
            iconName: 'Scale',
            shortDesc: 'Extrait de casier judiciaire.',
            fullDesc: 'Document officiel attestant de l\'existence ou de l\'absence de condamnations pénales. Souvent requis pour un emploi ou un voyage.',
            requirements: ['Copie Carte d\'identité', 'Acte de naissance'],
            processingTime: '24 à 48 heures',
            cost: '10 USD'
        },
        {
            id: 'acte-naissance',
            title: 'Acte de Naissance',
            category: 'Etat Civil',
            iconName: 'Baby',
            shortDesc: 'Copie certifiée conforme.',
            fullDesc: 'Obtenez une copie intégrale ou un extrait d\'acte de naissance certifié conforme à l\'original.',
            requirements: ['Date et lieu de naissance', 'Noms des parents'],
            processingTime: '24 heures',
            cost: '5 USD'
        },
        {
            id: 'visa',
            title: 'Visa & Voyage',
            category: 'Immigration',
            iconName: 'Plane',
            shortDesc: 'Demande de visa d\'entrée.',
            fullDesc: 'Procédure E-Visa pour les visiteurs étrangers ou demande de visa long séjour.',
            requirements: ['Passeport valide', 'Lettre d\'invitation ou réservation hôtel', 'Preuve de moyens de subsistance'],
            processingTime: '3 à 7 jours',
            cost: 'Variable selon le type'
        },
        {
            id: 'vaccination',
            title: 'Certificat Vaccination',
            category: 'Santé',
            iconName: 'Syringe',
            shortDesc: 'Fièvre jaune et COVID-19.',
            fullDesc: 'Téléchargez votre carte verte numérique attestant de vos vaccinations obligatoires pour voyager.',
            requirements: ['Carnet de vaccination', 'Pièce d\'identité'],
            processingTime: 'Immédiat',
            cost: 'Gratuit'
        }
    ])

    const getServiceById = (id: string) => computed(() => services.value.find(s => s.id === id))

    return { services, getServiceById }
})
