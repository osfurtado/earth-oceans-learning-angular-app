import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Meer } from './meer/meer';
import { MeerDetails } from './meer/meer-details/meer-details';

export const routes: Routes = [
    { 
        path: '', 
        component: Home 
    },
    {
        path: ':ozean',
        component: Meer,
    }
];
