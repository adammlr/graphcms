import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Offer({ section }) {
  const [offer, setOffer] = useState();
  useEffect(() => {
    loadData(section.externalReference).then((resp) => {
      setOffer(resp.Offering);
    });
  }, [section]);

  return offer ? (
    <>
      <h2>{offer.DisplayName}</h2>
      {Object.values(offer.PricingPlanThumbnails).map((plan) => (
        <div
          className="card"
          style={{ width: '18rem', display: 'inline-block' }}
          key={plan.Id}
        >
          <div className="card-body">
            <h5 className="card-title">{plan.Name}</h5>
            <p className="card-text">{plan.ChargeAmount}</p>
            <Link to={`/shop/${offer.Id}`} className="btn btn-primary">
              Purchase
            </Link>
          </div>
        </div>
      ))}
    </>
  ) : (
    <div />
  );
}

async function loadData(externalRef) {
  const r = await fetch(
    `https://metadata.prd3.contentdirect.tv/Offering/OfferingExternalReferenceType/1928380192422000100/OfferingExternalReference/${externalRef}/Language/sv-SE/SystemId/dad1cb97-26e2-4955-b166-af54cd3aad45//JsonLongAsString/true`,
    {
      method: 'GET',
    }
  );
  return await r.json();
}
