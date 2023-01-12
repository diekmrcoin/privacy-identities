import React from "react";
import "./home.css";
import EventService from "../../services/event.service";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutMeEventName: "Layout.event.showAboutMe",
    };
  }
  handleShowAboutMe() {
    EventService.publish(this.state.aboutMeEventName);
  }
  render() {
    return (
      <div>
        <h1 className="center">Manifiesto del Cypherpunk</h1>
        <h2 className="subtitle-home center">Eric Hughes</h2>
        <h4 className="center">9 de marzo de 1993</h4>
        <p className="center">
          <small>
            <i>
              Traducción automática de{" "}
              <a
                rel="noreferrer"
                href="https://nakamotoinstitute.org/cypherpunk-manifesto/"
                target="_blank"
              >
                este artículo
              </a>
            </i>
          </small>
        </p>
        <hr />
        <p className="justify">
          La privacidad es necesaria para una sociedad abierta en la era
          electrónica. La privacidad no es secreto. Un asunto privado es algo
          que uno no quiere que lo sepa todo el mundo, pero un asunto secreto es
          algo que uno no quiere que lo sepa nadie.{" "}
          <strong>
            La privacidad es el poder de revelarse selectivamente al mundo.
          </strong>
        </p>
        <p className="justify">
          Si dos partes tienen algún tipo de trato, cada una tiene un recuerdo
          de su interacción. Cada parte puede hablar sobre su propia memoria de
          esto; ¿Cómo podría alguien evitarlo? Se podrían aprobar leyes en su
          contra, pero la libertad de expresión, incluso más que la privacidad,
          es fundamental para una sociedad abierta; buscamos no restringir
          ningún discurso en absoluto. Si muchas partes hablan juntas en el
          mismo foro, cada una puede hablar con todos los demás y agregar
          conocimientos sobre individuos y otras partes. El poder de las
          comunicaciones electrónicas ha permitido ese discurso grupal, y no
          desaparecerá simplemente porque podríamos quererlo.
        </p>
        <p className="justify">
          Como deseamos privacidad, debemos asegurarnos de que cada parte de una
          transacción tenga conocimiento solo de lo que es directamente
          necesario para esa transacción. Dado que se puede hablar de cualquier
          información, debemos asegurarnos de revelar lo menos posible. En la
          mayoría de los casos, la identidad personal no es destacada. Cuando
          compro una revista en una tienda y le entrego dinero al empleado, no
          hay necesidad de saber quién soy. Cuando le pido a mi proveedor de
          correo electrónico que envíe y reciba mensajes, mi proveedor no
          necesita saber con quién estoy hablando o qué estoy diciendo o qué me
          dicen los demás; mi proveedor solo necesita saber cómo enviar el
          mensaje allí y cuánto les debo en honorarios. Cuando mi identidad es
          revelada por el mecanismo subyacente de la transacción, no tengo
          privacidad. No puedo revelarme selectivamente aquí; Debo
          siemprerevelarme.
        </p>
        <p className="justify">
          Por lo tanto, la privacidad en una sociedad abierta requiere sistemas
          de transacciones anónimos. Hasta ahora, el efectivo ha sido el
          principal sistema de este tipo. Un sistema de transacciones anónimo no
          es un sistema de transacciones secreto. Un sistema anónimo permite a
          las personas revelar su identidad cuando lo deseen y solo cuando lo
          deseen; Esta es la esencia de la privacidad.
        </p>
        <p className="justify">
          La privacidad en una sociedad abierta también requiere criptografía.
          Si digo algo, quiero que solo lo escuchen aquellos para quienes lo
          pretendo. Si el contenido de mi discurso está disponible para el
          mundo, no tengo privacidad. Encriptar es indicar el deseo de
          privacidad y cifrar con criptografía débil es indicar que no hay
          demasiado deseo de privacidad. Además, revelar la identidad de uno con
          seguridad cuando el valor predeterminado es el anonimato requiere la
          firma criptográfica.
        </p>
        <p className="justify">
          No podemos esperar que los gobiernos, las corporaciones u otras
          organizaciones grandes y sin rostro nos otorguen privacidad por su
          beneficio. Es una ventaja para ellos hablar de nosotros, y debemos
          esperar que hablen. Intentar evitar su discurso es luchar contra las
          realidades de la información. La información no solo quiere ser
          gratuita, sino que debe ser gratuita. La información se expande para
          llenar el espacio de almacenamiento disponible. La información es la
          prima más joven y fuerte de Rumor; La información es más lenta, tiene
          más ojos, sabe más y comprende menos que Rumor.
        </p>
        <p className="justify">
          Debemos defender nuestra propia privacidad si esperamos tener alguna.
          Debemos unirnos y crear sistemas que permitan realizar transacciones
          anónimas. Las personas han estado defendiendo su propia privacidad
          durante siglos con susurros, oscuridad, sobres, puertas cerradas,
          apretones de manos secretos y correos. Las tecnologías del pasado no
          permitían una fuerte privacidad, pero las tecnologías electrónicas sí.
        </p>
        <p className="justify">
          Nosotros los Cypherpunks estamos dedicados a construir sistemas
          anónimos. Estamos defendiendo nuestra privacidad con la criptografía,
          con sistemas anónimos de reenvío de correo, con firmas digitales y con
          dinero electrónico.
        </p>
        <p className="justify">
          Los cipherpunks escriben código. Sabemos que alguien tiene que
          escribir software para defender la privacidad, y dado que no podemos
          obtener privacidad a menos que todos lo hagamos, lo vamos a escribir.
          Publicamos nuestro código para que nuestros compañeros Cypherpunks
          puedan practicar y jugar con él. Nuestro código es gratuito para
          todos, en todo el mundo. No nos importa mucho si no aprueba el
          software que escribimos. Sabemos que el software no se puede destruir
          y que un sistema ampliamente disperso no se puede apagar.
        </p>
        <p className="justify">
          Los cifrados deploran las regulaciones sobre criptografía, ya que el
          cifrado es fundamentalmente un acto privado. El acto de cifrado, de
          hecho, elimina la información del ámbito público. Incluso las leyes
          contra la criptografía llegan solo hasta la frontera de una nación y
          el brazo de su violencia. La criptografía se extenderá ineludiblemente
          por todo el mundo, y con ella los sistemas de transacciones anónimas
          que hace posible.
        </p>
        <p className="justify">
          Para que la privacidad se generalice, debe ser parte de un contrato
          social. Las personas deben venir y desplegar juntos estos sistemas
          para el bien común. La privacidad solo se extiende hasta la
          cooperación de los compañeros en la sociedad. Nosotros, los
          Cypherpunks, buscamos sus preguntas y sus preocupaciones y esperamos
          poder involucrarlo para que no nos engañemos a nosotros mismos. Sin
          embargo, no seremos sacados de nuestro curso porque algunos pueden
          estar en desacuerdo con nuestros objetivos.
        </p>
        <p className="justify">
          Los Cypherpunks participan activamente en hacer que las redes sean más
          seguras para la privacidad. Procedamos juntos a buen ritmo.
        </p>
        <p className="justify">Adelante.</p>
      </div>
    );
  }
}

export default Home;
