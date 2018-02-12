import React, { Component } from 'react';
import {
  SearchBox,
  SearchkitManager,
  SearchkitProvider,
  HierarchicalMenuFilter,
  RefinementListFilter,
  LayoutBody,
  LayoutResults,
  ResetFilters,
  Pagination,
  InitialLoader,
  NoHits,
  ViewSwitcherHits,
  HitStats,
  SideBar,
  Layout,
  TopBar,
  ActionBar,
  ActionBarRow,
  ViewSwitcherToggle,
  SelectedFilters,
  Hits
} from 'searchkit';
import './App.css';
import '../node_modules/searchkit/release/theme.css';

class App extends Component {
  host = '/api/query';
  searchkit = Object.assign(new SearchkitManager(this.host), {
  translateFunction: key => ({
    'pagination.next': 'Next Page',
    'pagination.previous': 'Previous Page',
  }[key])});

  render() {
    return (
      <div className="App">
        <SearchkitProvider searchkit={this.searchkit}>
          <Layout size="l">
            <TopBar>
              <div className="my-logo">Demo</div>
              <SearchBox
                translations={{'searchbox.placeholder': 'search documents'}}
                queryOptions={{minimum_should_match: '70%'}}
                autofocus={true}
                searchOnChange={true}
                queryFields={[]}/>
            </TopBar>
            <LayoutBody>
              <SideBar>
                <HierarchicalMenuFilter
                  fields={[]}
                  title="Categories"
                  id="categories"/>
                <RefinementListFilter
                  id=""
                  title="Refinement"
                  field=""
                  operator="AND"/>
              </SideBar>
              {/*<LayoutResults>
                <ActionBar>
                  <ActionBarRow>
                    <HitStats translations={{
                      'hitstats.results_found':'{hitCount} results found'
                    }}/>
                    <ViewSwitcherToggle/>
                  </ActionBarRow>
                  <ActionBarRow>
                    <SelectedFilters/>
                    <ResetFilters/>
                  </ActionBarRow>
                </ActionBar>
                <ViewSwitcherHits
                  hitsPerPage={12}
                  highlightFields={[]}
                  sourceFilter={[]}
                  hitComponents={[

                  ]}
                  scrollTo="body"/>
                <NoHits suggestionsField=""/>
                <InitialLoader/>
                <Pagination showNumbers={true}/>
              </LayoutResults>*/}
            </LayoutBody>
          </Layout>
        </SearchkitProvider>
      </div>
    );
  }
}

export default App;
