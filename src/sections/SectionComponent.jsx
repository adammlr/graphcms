import React from 'react';
import CallToAction from './CallToAction';
import Offer from './Offer';

export default function SectionComponent({ section }) {
  switch (section.componentType) {
    case 'CallToAction':
      return <CallToAction section={section} />;
    case 'Offering':
      return <Offer section={section} />;
    default:
      return <div />;
  }
}
