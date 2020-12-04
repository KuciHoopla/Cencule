import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotosResolver } from './_resolvers/photos.resolver';
import { BlogsResolver } from './_resolvers/blogs.resolver';
import { LakesComponent } from './lakes/lakes.component';
import { LakesResolver } from './_resolvers/lakes.resolver';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { photoWall: PhotosResolver, blog: BlogsResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    /* all children components will be protected to type in url directly by urlroute,
    if you want protect some route just put it to the list children
    */

    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        resolve: { users: MemberListResolver },
      },
      {
        path: 'lakes',
        component: LakesComponent,
        resolve: { lakes: LakesResolver },
      },

      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver },
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges],
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
