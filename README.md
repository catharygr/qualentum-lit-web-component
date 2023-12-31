# qualentum-lit-web-component
- He creado el documento index.html donde se va a llamar el web component
- He reutilizado varias propiedades existentes en la plantilla 
- Utilizando grid para centrar el contenido en el centro de la página

## Componente padre - timer-component
- Después de analizar el problema he decidido resolver el problema creando tres componentes.
- En en el componente padre he creado tres botones y basado en un atributo booleano, configuro cuál de los dos componente hijos se va a cargar,  shoppingCart-timer será por defecto asignádole el atributo false y event-timer si es true.
- Los tres botones despacharán sus respectivos eventos que lo utilizarán para controlar el comportamiento del temporizador, como pausarlo, reanudarlo o restablecerlo.
- La renderización de cada uno de los botones son configurables con sus respectivos atributos.

