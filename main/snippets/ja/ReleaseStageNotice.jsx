export const ReleaseStageNotice = ({
    feature,
    stage,
    plans,
    contact,
    terms
}) => {
    const stageTextMap = {
        "beta": "ベータ",
        "ea": "早期アクセス",
    };
    const stageText = stageTextMap[stage] || "製品リリース段階";

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
            { plans && (<>この機能は、{linkify(`${plans}プラン`, "https://auth0.com/pricing")}で利用できます。 </>) }
            { contact && ("参加するには、" + contact + " までお問い合わせください。 ") }
            { terms && (<>この機能を使用すると、Okta の{linkify("Master Subscription Agreement", "https://www.okta.com/legal")}に定める該当する無料トライアル条件に同意したものとみなされます。</>) }
        </span>
        );
    };

    return (
        <Warning>
            <span data-as="p">
                <strong>{feature} 機能は現在、{linkify(stageText, prsLink)}です。</strong>
            </span>

            {includeDetails(plans, contact, terms)}
        </Warning>
    )
}