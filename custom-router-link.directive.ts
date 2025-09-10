import { Directive, ElementRef, AfterViewInit, Input, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, QueryParamsHandling, Router, RouterLink } from '@angular/router';
import { combineLatest, fromEvent, Subject, takeUntil } from 'rxjs';

@Directive({
    selector: '[routerLink]'
})
export class CustomRouterLinkDirective implements AfterViewInit, OnDestroy {
    @Input() routerLink!: RouterLink['routerLink'];
    @Input() queryParams?: Params
    @Input() queryParamsHandling?: QueryParamsHandling
    @Input() fragment?: string
    @Input() preserveFragment?: boolean

    aElement?: Element
    href?: string

    private unsubscribe$ = new Subject<void>();

    constructor(private el: ElementRef, private renderer: Renderer2, private router: Router, private route: ActivatedRoute) { }

    ngAfterViewInit() {
        this.aElement = this.renderer.createElement('a')

        this.createUrl()

        combineLatest([
            this.route.url,
            this.route.queryParams,
            this.route.fragment,
            this.route.params
        ]).pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.createUrl());

        fromEvent(this.aElement!, 'click').pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
            event.preventDefault()
            if (!this.el.nativeElement.disabled) {
                this.router.navigateByUrl(this.href ?? '');
            }
        })

        this.renderer.setStyle(this.aElement!, 'display', 'contents')
        this.renderer.setStyle(this.aElement!, 'text-decoration', 'none')
        this.renderer.setStyle(this.aElement!, 'color', 'inherit')
        while (this.el.nativeElement.firstChild) {
            this.renderer.appendChild(this.aElement!, this.el.nativeElement.firstChild);
        }
        this.renderer.appendChild(this.el.nativeElement, this.aElement!)
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    createUrl() {
        let link = Array.isArray(this.routerLink) ? this.routerLink : [this.routerLink]

        this.href = this.router.serializeUrl(this.router.createUrlTree(link, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            queryParamsHandling: this.queryParamsHandling,
            fragment: this.fragment,
            preserveFragment: this.preserveFragment
        }))

        if (this.aElement) {
            this.renderer.setAttribute(this.aElement, 'href', this.href);
        }
    }
}
