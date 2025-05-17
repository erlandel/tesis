import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: '',
  standalone: true,
})
export class IconComponent implements AfterViewInit {
  @Input() name: 'home' | 'analyze' | 'menu' | 'add' | 'save' | 'filter' | 'collapseArrow' | 'addUser' | 'show'| 'remove'| 'filterWithe'|'pencil'|'pencilWhite'|'delete'|'upadte'| 'back'| 'subtract'| 'download'|'FillForm'|'settings' = 'home'; // Nombres de los iconos disponibles

  private icons: { [key: string]: string } = {
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512">
            <path fill="#3e99e7" d="M261.56 101.28a8 8 0 0 0-11.06 0L66.4 277.15a8 8 0 0 0-2.47 5.79L63.9 448a32 32 0 0 0 32 32H192a16 16 0 0 0 16-16V328a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v136a16 16 0 0 0 16 16h96.06a32 32 0 0 0 32-32V282.94a8 8 0 0 0-2.47-5.79Z" />
            <path fill="#3e99e7" d="m490.91 244.15l-74.8-71.56V64a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0 0 43 267.56L250.5 69.28a8 8 0 0 1 11.06 0l207.52 198.28a16 16 0 0 0 22.59-.44c6.14-6.36 5.63-16.86-.76-22.97" />
          </svg>`,

    analyze: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M15.5 12c2.5 0 4.5 2 4.5 4.5c0 .88-.25 1.71-.69 2.4l3.08 3.1L21 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5M7 15v2h2c.14 1.55.8 2.94 1.81 4H5a2 2 0 0 1-2-2V5c0-1.11.89-2 2-2h14a2 2 0 0 1 2 2v8.03A6.49 6.49 0 0 0 15.5 10c-1.27 0-2.46.37-3.46 1H7v2h3c-.36.6-.66 1.28-.83 2zm10-6V7H7v2z"/></svg>`,

    menu: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
             <path fill="currentColor" d="M3 13h2v-2H3zm0 4h2v-2H3zm0-8h2V7H3zm4 4h14v-2H7zm0 4h14v-2H7zM7 7v2h14V7z"/>
           </svg>`,

    add: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"/>
          </svg>`,
    save: `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 21H7m10 0h.803c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.427.218-.987.218-2.105V9.22c0-.45 0-.675-.048-.889a2 2 0 0 0-.209-.545c-.106-.19-.256-.355-.55-.682l-2.755-3.062c-.341-.378-.514-.57-.721-.708a2 2 0 0 0-.61-.271C15.863 3 15.6 3 15.075 3H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 4.52 3 5.08 3 6.2v11.6c0 1.12 0 1.68.218 2.107c.192.377.497.683.874.875c.427.218.987.218 2.105.218H7m10 0v-3.803c0-1.118 0-1.678-.218-2.105a2 2 0 0 0-.875-.874C15.48 14 14.92 14 13.8 14h-3.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C7 15.52 7 16.08 7 17.2V21m8-14H9"
            />
          </svg>`,
    filter: ` <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#171414" d="M3 4.5A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5v2.086A2 2 0 0 1 20.414 8L15 13.414v7.424a1.1 1.1 0 0 1-1.592.984l-3.717-1.858A1.25 1.25 0 0 1 9 18.846v-5.432L3.586 8A2 2 0 0 1 3 6.586z"/></g></svg>`,
    collapseArrow: ` <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20"><path fill="#171414" d="m15 8l-4.03 6L7 8z"/></svg>`,
    addUser: ` <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
          <path fill="#171414" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"/>
        </svg>`,
    show: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 10h3m0 0h3m-3 0V7m0 3v3m5 2l6 6m-11-4a7 7 0 1 1 0-14a7 7 0 0 1 0 14"/></svg>`,
    remove: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#3e99e7" fill-rule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-5-8h10v-2H7z" clip-rule="evenodd"/></svg>`,
    filterWithe: ` <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#fff" d="M3 4.5A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5v2.086A2 2 0 0 1 20.414 8L15 13.414v7.424a1.1 1.1 0 0 1-1.592.984l-3.717-1.858A1.25 1.25 0 0 1 9 18.846v-5.432L3.586 8A2 2 0 0 1 3 6.586z"/></g></svg>`,
    settings: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#3e99e7" d="m8.406 3.532l-.26 1.34a1.75 1.75 0 0 1-2.288 1.322l-1.294-.447q-.354.481-.598 1.033l1.035.898a1.75 1.75 0 0 1 0 2.643l-1.035.898q.244.552.598 1.034l1.294-.447a1.75 1.75 0 0 1 2.289 1.322l.26 1.34c.392.042.803.042 1.195 0l.26-1.34a1.75 1.75 0 0 1 2.288-1.322l1.288.444q.354-.482.599-1.036l-1.03-.893a1.75 1.75 0 0 1 0-2.643l1.03-.893a5.5 5.5 0 0 0-.6-1.036l-1.287.445a1.75 1.75 0 0 1-2.289-1.322l-.259-1.34a5.6 5.6 0 0 0-1.196 0m-.782-1.397a7 7 0 0 1 2.762.002a.75.75 0 0 1 .588.593l.36 1.857a.25.25 0 0 0 .327.189l1.784-.616a.75.75 0 0 1 .808.213a7 7 0 0 1 1.383 2.394a.75.75 0 0 1-.219.806L13.991 8.81a.25.25 0 0 0 0 .378l1.426 1.238c.23.199.317.517.22.805a7 7 0 0 1-1.384 2.395a.75.75 0 0 1-.807.213l-1.785-.616a.25.25 0 0 0-.327.189l-.36 1.857a.75.75 0 0 1-.588.593a7 7 0 0 1-2.762.002a.75.75 0 0 1-.59-.593l-.36-1.86a.25.25 0 0 0-.327-.188l-1.79.618a.75.75 0 0 1-.808-.213a7 7 0 0 1-1.383-2.39a.75.75 0 0 1 .219-.807L4.017 9.19a.25.25 0 0 0 0-.378L2.585 7.568a.75.75 0 0 1-.22-.807a7 7 0 0 1 1.384-2.39a.75.75 0 0 1 .808-.213l1.79.618a.25.25 0 0 0 .327-.19l.36-1.858a.75.75 0 0 1 .59-.593m6.317 12.499a.47.47 0 0 0-.53.15c-.223.295-.412.62-.558.965a.47.47 0 0 0 .135.533l1.007.875a.455.455 0 0 1 0 .686l-1.008.874a.47.47 0 0 0-.134.533q.221.52.559.966a.47.47 0 0 0 .528.15l1.26-.435a.455.455 0 0 1 .595.343l.253 1.309c.039.2.194.358.395.383a4.5 4.5 0 0 0 1.114 0a.47.47 0 0 0 .395-.383l.253-1.309a.455.455 0 0 1 .595-.343l1.26.435a.47.47 0 0 0 .528-.15q.338-.445.559-.966a.47.47 0 0 0-.134-.533l-1.008-.874a.455.455 0 0 1 0-.686l1.008-.875a.47.47 0 0 0 .134-.533a4.5 4.5 0 0 0-.559-.965a.47.47 0 0 0-.529-.15l-1.259.435a.455.455 0 0 1-.595-.344l-.253-1.308a.47.47 0 0 0-.395-.383a4.5 4.5 0 0 0-1.114 0a.47.47 0 0 0-.395.383l-.253 1.308a.455.455 0 0 1-.595.344zM17 18.75a1.25 1.25 0 1 1 0-2.502a1.25 1.25 0 0 1 0 2.502M8 9a1 1 0 1 1 2 0a1 1 0 0 1-2 0m1-2.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5"/></svg>`,
    pencil: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="56" stroke-dashoffset="56" d="M3 21l2 -6l11 -11c1 -1 3 -1 4 0c1 1 1 3 0 4l-11 11l-6 2"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M15 5l4 4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" stroke-width="1" d="M6 15l3 3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0"/></path></g><path fill="#000" fill-opacity="0" d="M17 4H20V7L9 18L6 15L17 4Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.15s" values="0;0.3"/></path></svg>`,
    delete: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="#000" fill-rule="evenodd" d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z" clip-rule="evenodd"/></svg>`,
    pencilWhite: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="56" stroke-dashoffset="56" d="M3 21l2 -6l11 -11c1 -1 3 -1 4 0c1 1 1 3 0 4l-11 11l-6 2"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M15 5l4 4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" stroke-width="1" d="M6 15l3 3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0"/></path></g><path fill="#fff" fill-opacity="0" d="M17 4H20V7L9 18L6 15L17 4Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.15s" values="0;0.3"/></path></svg>`, 
    upadte: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="#fff" fill-rule="evenodd" d="M1.903 7.297c0 3.044 2.207 5.118 4.686 5.547a.521.521 0 1 1-.178 1.027C3.5 13.367.861 10.913.861 7.297c0-1.537.699-2.745 1.515-3.663c.585-.658 1.254-1.193 1.792-1.602H2.532a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V2.686l-.001.002c-.572.43-1.27.957-1.875 1.638c-.715.804-1.253 1.776-1.253 2.97m11.108.406c0-3.012-2.16-5.073-4.607-5.533a.521.521 0 1 1 .192-1.024c2.874.54 5.457 2.98 5.457 6.557c0 1.537-.699 2.744-1.515 3.663c-.585.658-1.254 1.193-1.792 1.602h1.636a.5.5 0 1 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 1 1 1 0v1.845h.002c.571-.432 1.27-.958 1.874-1.64c.715-.803 1.253-1.775 1.253-2.97" clip-rule="evenodd"/></svg>`,  
    download: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z"/></svg>`,
    FillForm: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="m6.598 2.573l.694-.727l8.133 8.133q.479.479.479 1.156t-.479 1.156l-3.904 3.942q-.46.46-1.136.46q-.677 0-1.137-.46L5.344 12.29q-.479-.48-.479-1.156q0-.677.48-1.156L9.69 5.665zm3.806 3.806l-4.39 4.352q-.097.096-.125.202q-.03.106-.03.22h9.05q0-.114-.028-.22t-.125-.202zm8.173 11.313q-.633 0-1.066-.433q-.434-.434-.434-1.067q0-.448.236-.884t.495-.827q.186-.262.378-.51q.193-.248.391-.51q.198.262.39.51q.193.248.38.51q.259.39.494.827q.236.436.236.884q0 .633-.434 1.067q-.433.433-1.066.433M2 24v-2h20v2z"/></svg>`,
    back: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M4.4 7.4L6.8 4h2.5L7.2 7h6.3a6.5 6.5 0 0 1 0 13H9l1-2h3.5a4.5 4.5 0 1 0 0-9H7.2l2.1 3H6.8L4.4 8.6L4 8z"/></svg>`,
    subtract: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 12 12"><path fill="#3e99e7" d="M1 6a5 5 0 1 1 10 0A5 5 0 0 1 1 6m3-.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z"/></svg>`,
  };

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const icon = this.icons[this.name];
    if (icon) {
      this.el.nativeElement.innerHTML = icon;
    }
  }
}
