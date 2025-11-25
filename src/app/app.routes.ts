import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Meer } from './meer/meer';
import { Tier } from './tier/tier';
import { MeerDetails } from './meer/meer-details/meer-details';
import { Vergleich } from './vergleich/vergleich';
import { Quiz } from './quiz/quiz';


export const routes: Routes = [
    { 
        path: '', 
        component: Home 
    },
    {
        path: ':ozean',
        component: Meer,
        children: [
            {
                path: '',
                component: MeerDetails,
            },
            {
                path: "vergleich",
                component: Vergleich,
            },
            {
                path: 'tiere',
                component: Tier,
            },
            {
                path: 'quiz',
                component: Quiz
            }
        ]
    }
];
