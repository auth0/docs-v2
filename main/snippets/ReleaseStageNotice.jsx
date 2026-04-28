export const ReleaseStageNotice = ({
    feature,
    stage,
    enterprise,
    contact,
    terms
}) => {
    let stageText = "a product release stage";
    if (stage == "beta") {
        stageText = "Beta";
    } else if (stage == "ea") {
        stageText = "Early Access";
    }

    const prsLink = "/docs/troubleshoot/product-lifecycle/product-release-stages";
    const linkify = (text, url) => {
        return (
            <a href={url} target="_blank" rel="noreferrer" class="link">{text}</a>
        )
    };

    const includeDeets = (enterprise, contact, terms) => {
        const hasDeets = terms || enterprise || contact;
        if (!hasDeets) return null;

        return (
        <span data-as="p">
            { enterprise && "This feature requries an Enterprise plan. " } 
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

            {includeDeets(enterprise, contact, terms)}
        </Warning>
    )
}
