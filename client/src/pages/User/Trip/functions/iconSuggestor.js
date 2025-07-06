import {
    FaUtensils,
    FaShoppingCart,
    FaFilm,
    FaDog,
    FaBook,
} from 'react-icons/fa';
import { FaMoneyCheckDollar, FaHouseChimney, FaPlaneDeparture } from 'react-icons/fa6';
import { LuPartyPopper } from "react-icons/lu";

const categoryMap = {
    food: {
        keywords: ['food', 'snack', 'dinner', 'lunch', 'meal', 'restaurant'],
        icon: FaUtensils,
        color: 'var(--red1)',      // red-ish
        bgColor: 'var(--reda)'
    },
    travel: {
        keywords: ['travel', 'trip', 'flight', 'uber', 'airport'],
        icon: FaPlaneDeparture,
        color: 'var(--blue1)',      // blue
        bgColor: 'var(--bluea)'
    },
    shopping: {
        keywords: ['buy', 'purchase', 'groceries', 'shopping', 'mall', 'store'],
        icon: FaShoppingCart,
        color: 'var(--green1)',      // green
        bgColor: 'var(--greena)'
    },
    entertainment: {
        keywords: ['movie', 'film', 'netflix', 'concert', 'show', 'music'],
        icon: FaFilm,
        color: '#f0ad4e',      // orange
        bgColor: '#ffe8cc'
    },
    pets: {
        keywords: ['dog', 'cat', 'pet', 'vet', 'grooming', 'treat'],
        icon: FaDog,
        color: '#795548',      // brown
        bgColor: '#f2e0d6'
    },
    books: {
        keywords: ['book', 'read', 'reading', 'novel', 'library'],
        icon: FaBook,
        color: '#673ab7',      // deep purple
        bgColor: '#e6dcf7'
    },
    party: {
        keywords: ['party', 'event', 'celebration', 'birthday', 'gathering'],
        icon: LuPartyPopper,
        color: '#f39c12',
        bgColor: '#fff3cd'
    },
    home: {
        keywords: ['home', 'rent', 'utilities', 'hotel', 'accommodation'],
        icon: FaHouseChimney,
        color: '#673ab7',      // deep purple
        bgColor: '#e6dcf7'
    },
    unknown: {
        icon: FaMoneyCheckDollar,
        color: '#6c757d',       // gray
        bgColor: '#e2e3e5'
    }
};

const getCategoryForDescription = (description = '') => {
    const lowerDesc = description.toLowerCase();

    for (const key in categoryMap) {
        const { keywords } = categoryMap[key];
        if (keywords?.some((word) => lowerDesc.includes(word))) {
            return categoryMap[key];
        }
    }
    return categoryMap.unknown;
};

export default getCategoryForDescription;