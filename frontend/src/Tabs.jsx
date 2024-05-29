import React from 'react';
import { Container, Tabs } from '@mantine/core';
import classes from './Tabs.module.css';

export function HeaderTabs({setActiveHeaderTab, activeHeaderTab}) {
  const tabs = ['Map', 'Heat Map'];

  return (
    <Container fluid pl={80}>
      <Tabs
        value={activeHeaderTab}
        onChange={setActiveHeaderTab}
        classNames={{
          root: classes.tabs,
          list: classes.tabsList,
          tab: classes.tab
        }}
      >
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab value={tab} key={tab}>
              {tab}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Container>
  );
}

export function SecondHeaderTabs({setActiveHeaderTab, activeHeaderTab}) {
  const tabs = ['Audio Upload', 'Form'];

  return (
    <Container fluid pl={80}>
      <Tabs
        value={activeHeaderTab}
        onChange={setActiveHeaderTab}
        classNames={{
          root: classes.tabs,
          list: classes.tabsList,
          tab: classes.tab,
        }}
      >
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab value={tab} key={tab}>
              {tab}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Container>
  );
}

export function ThirdHeaderTabs({setActiveHeaderTab, activeHeaderTab}) {
  const tabs = ['Overview', 'Statistics'];

  return (
    <Container fluid pl={80}>
      <Tabs
        value={activeHeaderTab}
        onChange={setActiveHeaderTab}
        classNames={{
          root: classes.tabs,
          list: classes.tabsList,
          tab: classes.tab,
        }}
      >
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab value={tab} key={tab}>
              {tab}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Container>
  );
}



