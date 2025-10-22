export const CustomCard = ({ item }) => {
  const isComingSoon = item.status === 'Coming Soon';

  const cardContent = (
    <div className="custom-card">
      <div className="custom-card-header">
        <span className={`custom-card-icon ${isComingSoon ? 'coming-soon' : ''}`}>
          <img
            src={item.icon}
            alt={`${item.title} icon`}
            style={{...item.styles}}
          />
        </span>
        <h3 className={`custom-card-title ${isComingSoon ? 'coming-soon' : ''}`}>
          {item.title}
        </h3>
      </div>

      <p className={`custom-card-description ${isComingSoon ? 'coming-soon' : ''}`}>
        {item.description}
      </p>

      <div className="custom-card-footer">
        {isComingSoon && (
          <em className="custom-card-coming-soon">
            Coming Soon
          </em>
        )}
      </div>
    </div>
  );

  return (
    <Card
      href={item.href}
      disabled={isComingSoon}
    >
      {cardContent}
    </Card>
  );
}
