import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Meer } from './meer/meer';
import { Tier } from './tier/tier';
import { MeerDetails } from './meer/meer-details/meer-details';


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
                component: MeerDetails
            },
            {
                path: 'tiere',
                component: Tier
            }
        ]
    }
];
