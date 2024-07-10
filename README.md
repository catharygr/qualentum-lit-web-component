## qualentum-lit-web-component
- He creado el documento index.html donde se va a llamar el web component
- He reutilizado varias propiedades existentes en la plantilla 
- He utilizado grid para centrar el contenido en el centro de la página
- Después de analizar el problema he decidido resolver el problema creando dos componentes.

### Componente padre - timer-component
- En en el componente padre he creado tres botones y la renderización de cada uno de los botones son configurables con sus respectivos atributos.
- Los tres botones despacharán sus respectivos eventos que lo utilizarán en el componente hijo para controlar el comportamiento del temporizador, como pausarlo, reanudarlo o restablecerlo.
- El componente tiene varias propiedades que controlan su comportamiento y apariencia. Estas propiedades incluyen shorttimer, btnpause, btnplay, btnreset, reverse, autoreset, autostart, start, limit, doubledigits.
- El componente utiliza varios métodos del ciclo de vida de LitElement, incluyendo connectedCallback, disconnectedCallback, y firstUpdated. Estos métodos se utilizan para manejar eventos, actualizar el DOM, y limpiar los recursos cuando el componente se desconecta del DOM.
- El componente emite y escucha varios eventos personalizados. Estos eventos se utilizan para controlar el comportamiento del temporizador y actualizar el estado del componente.
- El método render define la estructura HTML del componente. Utiliza las propiedades del componente para determinar qué elementos renderizar y cómo deben comportarse. Por ejemplo, los botones de play, pause, y reset se renderizan en función de las propiedades btnplay, btnpause, y btnreset, respectivamente.
- Finalmente, el componente se registra con el nombre timer-component utilizando customElements.define. Esto permite que el componente se utilice en HTML como <timer-component>.

### Componente hijo - timer-display
- Este componente hijo se carga en el componente padre, timer-component.
- El componente timer-display es un temporizador que cuenta hacia arriba o hacia abajo, dependiendo de la propiedad reverse.
- El componente tiene varias propiedades que controlan su comportamiento y apariencia. Estas propiedades incluyen reverse, autoreset, autostart, start, limit, y doubledigits.
- El componente utiliza varios métodos del ciclo de vida de LitElement, incluyendo connectedCallback, disconnectedCallback, y firstUpdated. Estos métodos se utilizan para manejar eventos, actualizar el DOM, y limpiar los recursos cuando el componente se desconecta del DOM.
- El componente emite un evento y escucha varios eventos emitidos en el componente padre. Estos eventos se utilizan para controlar el comportamiento del temporizador y actualizar el estado del componente.
- El método renderDisplay se encarga a base de los atributos boleanos de renderizar minutos y segundos o días, horas, minutos y segundo según la tarea asignada. De esta manera toda la lógica del temporizador se comparte entre dos formas de presentación
- El método render define la estructura HTML del componente. Utiliza las propiedades del componente para determinar qué elementos renderizar y cómo deben comportarse. Por ejemplo, los elementos de minutos y segundos se renderizan en función de la propiedad doubledigits.
- Finalmente, el componente se registra con el nombre timer-display utilizando customElements.define. Esto permite que el componente se utilice en HTML como <timer-display>.

## HTMl
- El componente del temporizador se incluye con la etiqueta <timer-component>.

Un saludo.