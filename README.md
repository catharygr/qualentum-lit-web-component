# qualentum-lit-web-component
- He creado el documento index.html donde se va a llamar el web component
- He reutilizado varias propiedades existentes en la plantilla 
- He utilizado grid para centrar el contenido en el centro de la página

## Componente padre - timer-component
- Después de analizar el problema he decidido resolver el problema creando tres componentes.
- En en el componente padre he creado tres botones y basado en un atributo booleano, configuro cuál de los dos componente hijos se va a cargar,  event-timer será por defecto asignádole el atributo false y shoppinggCart-timer si es true.
- Los tres botones despacharán sus respectivos eventos que lo utilizarán para controlar el comportamiento del temporizador, como pausarlo, reanudarlo o restablecerlo.
- La renderización de cada uno de los botones son configurables con sus respectivos atributos.
- El componente tiene varias propiedades que controlan su comportamiento y apariencia. Estas propiedades incluyen eventtimer, shoppingcarttimer, btnpause, btnplay, btnreset, reverse, autoreset, autostart, start, limit, doubledigits, playDisabled, pauseDisabled, y resetDisabled.
- El componente utiliza varios métodos del ciclo de vida de LitElement, incluyendo connectedCallback, disconnectedCallback, y updated. Estos métodos se utilizan para manejar eventos, actualizar el DOM, y limpiar los recursos cuando el componente se desconecta del DOM.
- El componente emite y escucha varios eventos personalizados. Estos eventos se utilizan para controlar el comportamiento del temporizador y actualizar el estado del componente.
- El método render define la estructura HTML del componente. Utiliza las propiedades del componente para determinar qué elementos renderizar y cómo deben comportarse. Por ejemplo, los botones de play, pause, y reset se renderizan en función de las propiedades btnplay, btnpause, y btnreset, respectivamente.
- Finalmente, el componente se registra con el nombre timer-component utilizando customElements.define. Esto permite que el componente se utilice en HTML como <timer-component>.

## Componente hijos - shoppingCart-timer -event-timer
- Este componente es uno de los dos componentes hijos que se pueden cargar en el componente padre, timer-component, basado en un atributo booleano.
El componente shoppingCart-timer es un temporizador que cuenta hacia arriba o hacia abajo, dependiendo de la propiedad reverse.
- El componente tiene varias propiedades que controlan su comportamiento y apariencia. Estas propiedades incluyen reverse, autoreset, autostart, start, limit, y doubledigits.
- El componente utiliza varios métodos del ciclo de vida de LitElement, incluyendo connectedCallback, disconnectedCallback, y firstUpdated. Estos métodos se utilizan para manejar eventos, actualizar el DOM, y limpiar los recursos cuando el componente se desconecta del DOM.
- El componente emite y escucha varios eventos personalizados. Estos eventos se utilizan para controlar el comportamiento del temporizador y actualizar el estado del componente.
- El método render define la estructura HTML del componente. Utiliza las propiedades del componente para determinar qué elementos renderizar y cómo deben comportarse. Por ejemplo, los elementos de minutos y segundos se renderizan en función de la propiedad doubledigits.
- Finalmente, el componente se registra con el nombre shopping-cart-timer utilizando customElements.define. Esto permite que el componente se utilice en HTML como <shopping-cart-timer>.

## HTMl
- El componente del temporizador se incluye con la etiqueta <timer-component>. Este componente tiene varias propiedades que se definen como atributos, incluyendo start, limit, doubledigits, btnpause, btnplay, btnreset, y reverse.
- se incluye el archivo JavaScript principal de la aplicación con la etiqueta <script>. Este archivo define el comportamiento de los componentes de la aplicación.
