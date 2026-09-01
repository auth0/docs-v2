export const ReleaseStageNotice = ({
    feature,
    stage,
    plans,
    contact,
    terms
}) => {
    const stageTextMap = {
        "beta": "bêta",
        "ea": "Accès anticipé",
    };
    const stageText = stageTextMap[stage] || "une phase de lancement du produit";

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
            { plans && (<>Cette fonctionnalité est offerte avec les forfaits {linkify(`${plans}`, "https://auth0.com/pricing")}. </>) }
            { contact && ("Pour y participer, communiquez avec " + contact + ". ") }
            { terms && (<>En utilisant cette fonctionnalité, vous acceptez les conditions applicables de l’essai gratuit énoncées dans le {linkify("Master Subscription Agreement", "https://www.okta.com/legal")} d’Okta.</>) }
        </span>
        );
    };

    return (
        <Warning>
            <span data-as="p">
                <strong>La fonctionnalité {feature} est en {linkify(stageText, prsLink)}.</strong>
            </span>

            {includeDetails(plans, contact, terms)}
        </Warning>
    )
}