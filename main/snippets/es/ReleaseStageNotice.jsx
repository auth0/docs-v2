export const ReleaseStageNotice = ({
    feature,
    stage,
    plans,
    contact,
    terms
}) => {
    const stageTextMap = {
        "beta": "Beta",
        "ea": "Acceso anticipado",
    };
    const stageText = stageTextMap[stage] || "una etapa de lanzamiento del producto";

    const prsLink = "/docs/troubleshoot/product-lifecycle/product-release-stages";
    const linkify = (text, url) => {
        return (
            <a href={url} target="_blank" rel="noreferrer" class="link">{text}</a>
        )
    };

    const includeDetails = (plans, contact, terms) => {
        const hasDetails = terms || plans || contact;
        if (!hasDetails) return null;

        return (
        <span data-as="p">
            { plans && (<>Esta funcionalidad está disponible en los {linkify(`planes ${plans}`, "https://auth0.com/pricing")}. </>) }
            { contact && ("Para participar, ponte en contacto con " + contact + ". ") }
            { terms && (<>Al usar esta funcionalidad, aceptas los términos aplicables de la prueba gratuita incluidos en el {linkify("Master Subscription Agreement", "https://www.okta.com/legal")} de Okta.</>) }
        </span>
        );
    };

    return (
        <Warning>
            <span data-as="p">
                <strong>La funcionalidad {feature} está en {linkify(stageText, prsLink)}.</strong>
            </span>

            {includeDetails(plans, contact, terms)}
        </Warning>
    )
}