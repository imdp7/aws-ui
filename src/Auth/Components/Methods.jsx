import React, { useState } from 'react';
import {
  Cards,
  Box,
  Button,
  TextFilter,
  Header,
  Badge,
  SpaceBetween,
  ButtonDropdown,
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

function Methods() {
  const [selectedItems, setSelectedItems] = React.useState([
    {
      name: 'Darshan Patel',
    },
  ]);
  const navigate = useNavigate();
  return (
    <SpaceBetween size="m">
      <Cards
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        selectedItems={selectedItems}
        ariaLabels={{
          itemSelectionLabel: (e, n) => `select ${n.name}`,
          selectionGroupLabel: 'Item selection',
        }}
        cardDefinition={{
          header: (item) => item.card,
          sections: [
            {
              id: 'image',
              content: () => (
                <div className="card-section-image">
                  <img src={item.image} alt={item.image} />
                </div>
              ),
            },
            {
              id: 'name',
              content: (item) => item.name,
            },
            {
              id: 'expiry',
              content: (item) => item.expiry,
            },
            {
              id: 'type',
              content: (item) =>
                item.type === 'Default' ? (
                  <Badge color="blue">{item.type}</Badge>
                ) : null,
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 3 }]}
        items={[
          {
            card: 'Mastercard ••••9441',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/989px-Mastercard-logo.svg.png',
            name: 'Darshan Patel',
            expiry: 'Expires on 01/2025',
            type: 'Default',
          },
          {
            card: 'Visa ••••6031',
            name: 'Andy Jassy',
            expiry: 'Expires on 01/2025',
            type: 'null',
          },
        ]}
        loadingText="Loading Payment methods"
        selectionType="single"
        trackBy="name"
        visibleSections={['card', 'name', 'expiry', 'type']}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No payment methods</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              No payment methods.
            </Box>
            <Button>Add payment method</Button>
          </Box>
        }
        filter={<TextFilter filteringPlaceholder="Find payment methods" />}
        header={
          <Header
            counter={
              selectedItems.length ? '(' + selectedItems.length + '/1)' : '(0)'
            }
            actions={
              <SpaceBetween direction="horizontal" size="s">
                <Button
                  disabled={
                    selectedItems.length == 0 ||
                    selectedItems[0].type === 'Default'
                  }
                >
                  Set as default
                </Button>
                <Button>Edit</Button>
                <Button
                  disabled={
                    selectedItems.length == 0 ||
                    selectedItems[0].type === 'Default'
                  }
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate('paymentMethod/add', {
                      state: { title: 'Add payment method' },
                    })
                  }
                >
                  Add payment method
                </Button>
              </SpaceBetween>
            }
          >
            Payment methods
          </Header>
        }
      />
    </SpaceBetween>
  );
}

export default Methods;
