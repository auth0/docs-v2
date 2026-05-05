export const ReleaseStageNotice = ({
    feature,
    stage,
    enterprise,
    contact,
    terms
}) => {
    const stageTextMap = {
        "beta": "Beta",
        "ea": "Early Access",
    };
    const stageText = stageTextMap[stage] || "a product release stage";

    const prsLink = "/docs/troubleshoot/product-lifecycle/product-release-stages";
    const linkify = (text, url) => {
        return (
            <a href={url} target="_blank" rel="noreferrer" class="link">{text}</a>
        )
    };

    const includeDetails = (enterprise, contact, terms) => {
        const hasDetails = terms || enterprise || contact;
        if (!hasDetails) return null;

        return (
        <span data-as="p">
            { enterprise && "This feature requires an Enterprise plan. " } 
            { contact && ("To participate, contact " + contact + ". ") }
            { terms && (<>By using this feature, you agree to the applicable Free Trial terms in Okta's {linkify("Master Subscription Agreement", "https://www.okta.com/legal")}.</>) }
        </span>
        );
    };

    return (
        <Warning>
            <span data-as="p">
                <strong>The {feature} feature is in {linkify(stageText, prsLink)}.</strong>
            </span>

            {includeDetails(enterprise, contact, terms)}
        </Warning>
    )
}
