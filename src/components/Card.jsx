import React from 'react';
import { Cards, Button, Box } from '@cloudscape-design/components';

function Card() {
  const [selectedItems, setSelectedItems] = React.useState([
    { name: 'Favorites' },
  ]);
  return (
    <div>
      <Cards
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        selectedItems={selectedItems}
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.name}`,
          selectionGroupLabel: 'Item selection',
        }}
        cardDefinition={{
          header: (e) => e.name,
          sections: [
            {
              id: 'description',
              content: (e) => e.description,
            },
            {
              id: 'image',
              content: (e) => e.image,
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
        items={[
          {
            name: 'Favorites',
            alt: 'First',
            description: 'Quickly access your favorite services.',
            image: (
              <img
                src="https://a.b.cdn.console.awsstatic.com/faeff28d80b3cef1a0e7f28aad8b5e190506f77e4f59de62611c4f12c9c0efd0/module-assets/dashboard-widget-favorites/favorites-gallery-overview-light.png"
                style={{ objectFit: 'contain' }}
                alt="placeholder"
              />
            ),
          },
          {
            name: `Ops summary`,
            alt: 'Second',
            description: 'Quickly view your operational status',
            image: (
              <img
                src="https://a.b.cdn.console.awsstatic.com/faeff28d80b3cef1a0e7f28aad8b5e190506f77e4f59de62611c4f12c9c0efd0/module-assets/dashboard-widget-favorites/favorites-gallery-overview-light.png"
                style={{ objectFit: 'contain' }}
                alt="placeholder"
              />
            ),
          },
          {
            name: 'Patch compliance ',
            alt: 'Third',
            description: 'Quickly view your patch status',
            image: (
              <img
                src="https://a.b.cdn.console.awsstatic.com/faeff28d80b3cef1a0e7f28aad8b5e190506f77e4f59de62611c4f12c9c0efd0/module-assets/dashboard-widget-favorites/favorites-gallery-overview-light.png"
                style={{ objectFit: 'contain' }}
                alt="placeholder"
              />
            ),
          },
        ]}
        loadingText="Loading resources"
        selectionType="multi"
        trackBy="name"
        visibleSections={['description', 'image', 'name']}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              No resources to display.
            </Box>
            <Button>Create resource</Button>
          </Box>
        }
      />
    </div>
  );
}

export default Card;
