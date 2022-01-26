import { useState } from 'react';
import { Guitar } from 'types/types';
import { GuitarTypeName, TabName } from 'constants/constants';

type DescriptionProps = {
  currentGuitar: Guitar,
}

export default function Description(props: DescriptionProps): JSX.Element {
  const { currentGuitar } = props;

  const [activeTab, setActiveTab] = useState<TabName>(TabName.Characteristics);

  const renderTabContent = () => {
    if (activeTab === TabName.Characteristics) {
      return (
        <table className="tabs__table">
          <tbody>
            <tr className="tabs__table-row">
              <td className="tabs__title">Артикул:</td>
              <td className="tabs__value">
                {currentGuitar.vendorCode}
              </td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Тип:</td>
              <td className="tabs__value">
                {currentGuitar ? GuitarTypeName[currentGuitar.type] : ''}
              </td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Количество струн:</td>
              <td className="tabs__value">
                {currentGuitar.stringCount} струнная
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
    if (activeTab === TabName.Description) {
      return (
        <p className="tabs__product-description">
          {currentGuitar.description}
        </p>
      );
    }
  };

  return (
    <div className="tabs">
      {Object.values(TabName).map((tabName) => (
        <a key={tabName}
          onClick={(evt) => {
            evt.preventDefault();
            setActiveTab(tabName);
          }}
          className={`button button--medium tabs__button
            ${activeTab === tabName ? '' : 'button--black-border'}
          `}
          style={{ pointerEvents: activeTab === tabName ? 'none' : 'auto' }}
          href="#characteristics"
        >
          {tabName}
        </a>
      ))}
      <div className="tabs__content" id="characteristics">
        {renderTabContent()}
      </div>
    </div>
  );
}
