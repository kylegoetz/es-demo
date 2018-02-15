import React, { Component } from 'react';
import {
  SearchBox,
  SearchkitManager,
  SearchkitProvider,
  HierarchicalMenuFilter,
  RefinementListFilter,
  LayoutBody,
  RangeFilter,
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
  SortingSelector,
  SelectedFilters,
  Hits,
  HitsStats
} from 'searchkit';
import './App.css';
import '../node_modules/searchkit/release/theme.css';

const MSWordIcon = () => Icon('https://png.icons8.com/ios/1600/ms-word.png');
const PDFIcon = () => Icon('https://image.flaticon.com/icons/svg/80/80942.svg');
const ExcelIcon = () => Icon('https://png.icons8.com/ios/1600/ms-excel.png');
const DefaultIcon = () => Icon('https://cdn0.iconfinder.com/data/icons/thin-files-documents/57/thin-071_file_document_code_binary-512.png');

const Icon = src => (
  <img className="result-icon"  src={src}/>
);

const getIcon = type => {
  return ({
    'application/msword': <MSWordIcon/>,
    'application/pdf': <PDFIcon/>,
    'application/vnd.ms-excel': <ExcelIcon/>
  })[type] || <DefaultIcon/>;
}

const getTitle = result =>
  (  result._source.meta.title && result._source.meta.title.trim().length > 0  )
    ? result._source.meta.title
    : result._source.file.filename;

const GridItem = ({bemBlocks, result}) => {
  console.log('result',result);
  return (
    <div className="grid-result" data-qa="hit">
      {getIcon(result._source.file.content_type)}
      <h5>{getTitle(result)}</h5>
    </div>
  )
}

const ListItem = ({bemBlocks, result}) => {
  return (
    <div className="list-result" data-qa="hit">
      {getIcon(result._source.file.content_type)}
      <span>{getTitle(result)}</span>
    </div>
  );
}

class App extends Component {
  host = '/api/docs';
  searchkit = Object.assign(new SearchkitManager(this.host), {
  translateFunction: key => ({
    'pagination.next': 'Next Page',
    'pagination.previous': 'Previous Page',
  }[key])});

  queryFields=[
    'file.filename',
    'meta.author',
    'meta.title',
    'content'
  ];

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
                queryFields={this.queryFields}/>
            </TopBar>
            <LayoutBody>
              <SideBar>
                <HierarchicalMenuFilter
                  fields={['file.content_type']}
                  title="File Type"
                  id="file-type"/>
                <RangeFilter
                  title="File Size"
                  id="filesize"
                  min={0}
                  max={1000000}
                  field={'file.filesize'}
                  showHistogram={true}/>
              </SideBar>
              <LayoutResults>
                <ActionBar>
                  <ActionBarRow>
                    <HitsStats translations={{
                      "hitstats.results_found":"{hitCount} results found"}}/>
                    <ViewSwitcherToggle/>
                    <SortingSelector options={[
                        {label: 'Relevance', field: '_score', order: 'desc', defaultOption: true}
                    ]}/>
                  </ActionBarRow>
                  <ActionBarRow>
                    <SelectedFilters/>
                    <ResetFilters/>
                  </ActionBarRow>
                </ActionBar>
                <ViewSwitcherHits
                  hitsPerPage={12}
                  hitComponents={[
                    {key:'grid', title: 'Grid', itemComponent:GridItem, defaultOption:true},
                    {key:'list', title: 'List', itemComponent:ListItem}
                  ]}
                  scrollTo="body"
                />
                <InitialLoader/>
                <Pagination showNumbesr={true}/>
              </LayoutResults>
            </LayoutBody>
          </Layout>
        </SearchkitProvider>
      </div>
    );
  }
}

export default App;
