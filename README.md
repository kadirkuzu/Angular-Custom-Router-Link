# Angular Custom Router Link

A custom Angular directive that extends the functionality of `routerLink` by rendering elements as real `<a>` tags.  
This enables native browser features such as **"Open in new tab"**, **"Copy link"**, and improves accessibility while still using Angular Router.

---

## ✨ Features

- Renders `routerLink` elements as real `<a>` tags
- Supports:
  - `queryParams`
  - `queryParamsHandling`
  - `fragment`
  - `preserveFragment`
- Works seamlessly with Angular Router
- Adds right-click options: *open in new tab*, *copy link*, etc.

---

## 📦 Installation

Clone the repository or copy the directive into your Angular project:

```bash
git clone https://github.com/kadirkuzu/Angular-Custom-Router-Link.git
```

---

## ⚙️ Usage

### ✅ If using NgModules

Add it into your module’s `declarations` array:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomRouterLinkDirective } from './custom-router-link.directive';

@NgModule({
  declarations: [
    AppComponent,
    CustomRouterLinkDirective  // 👈 Add here
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### ✅ If using Standalone Components

You can import the directive directly inside the component:

```ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRouterLinkDirective } from './custom-router-link.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CustomRouterLinkDirective], // 👈 Import here
  template: `
    <h1>Angular Custom Router Link Demo</h1>
    <button [routerLink]="['/dashboard']">Go to Dashboard</button>
  `
})
export class AppComponent {}
```

### ✅ Use in templates

```html
<!-- Example 1 -->
<button [routerLink]="['/dashboard']">Go to Dashboard</button>

<!-- Example 2 with query params -->
<div
  [routerLink]="['/products']"
  [queryParams]="{ sort: 'price', order: 'asc' }"
>
  Products
</div>
```

Both elements will behave as real links, so users can right-click and select **"Open in new tab"** or **"Copy link"**.

---

## 📜 License

MIT License © [Ejder Kadir Kuzu](https://github.com/kadirkuzu)
