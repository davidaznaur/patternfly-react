import { Fragment, useEffect, useRef, useState } from 'react';
import {
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Menu,
  MenuContent,
  MenuList,
  MenuItem,
  MenuToggle,
  MenuToggleCheckbox,
  Popper,
  Pagination,
  EmptyState,
  EmptyStateFooter,
  EmptyStateBody,
  Button,
  Bullseye,
  ToolbarToggleGroup,
  EmptyStateActions
} from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';

interface Repository {
  name: string;
  threads: string;
  apps: string;
  workspaces: string;
  status: string;
  location: string;
}

// In real usage, this data would come from some external source like an API via props.
const repositories: Repository[] = [
  { name: 'US-Node 1', threads: '5', apps: '25', workspaces: '5', status: 'Stopped', location: 'Raleigh' },
  { name: 'US-Node 2', threads: '5', apps: '30', workspaces: '2', status: 'Down', location: 'Westford' },
  { name: 'US-Node 3', threads: '13', apps: '35', workspaces: '12', status: 'Degraded', location: 'Boston' },
  { name: 'US-Node 4', threads: '2', apps: '5', workspaces: '18', status: 'Needs Maintenance', location: 'Raleigh' },
  { name: 'US-Node 5', threads: '7', apps: '30', workspaces: '5', status: 'Running', location: 'Boston' },
  { name: 'US-Node 6', threads: '5', apps: '20', workspaces: '15', status: 'Stopped', location: 'Raleigh' },
  { name: 'CZ-Node 1', threads: '12', apps: '48', workspaces: '13', status: 'Down', location: 'Brno' },
  { name: 'CZ-Node 2', threads: '3', apps: '8', workspaces: '20', status: 'Running', location: 'Brno' },
  { name: 'CZ-Remote-Node 1', threads: '1', apps: '15', workspaces: '20', status: 'Down', location: 'Brno' },
  { name: 'Bangalore-Node 1', threads: '1', apps: '20', workspaces: '20', status: 'Running', location: 'Bangalore' }
];

const columnNames = {
  name: 'Servers',
  threads: 'Threads',
  apps: 'Applications',
  workspaces: 'Workspaces',
  status: 'Status',
  location: 'Location'
};

export const FilterSameSelectGroup: React.FunctionComponent = () => {
  // Set up repo filtering
  const [locationSelection, setLocationSelection] = useState('All locations');
  const [statusSelection, setStatusSelection] = useState('All statuses');

  const onFilter = (repo: Repository) => {
    // Search status with status selection
    const matchesStatusValue = repo.status.toLowerCase() === statusSelection.toLowerCase();

    // Search location with location selections
    const matchesLocationValue = repo.location.toLowerCase() === locationSelection.toLowerCase();

    return (
      (statusSelection === 'All statuses' || matchesStatusValue) &&
      (locationSelection === 'All locations' || matchesLocationValue)
    );
  };
  const filteredRepos = repositories.filter(onFilter);

  // Set up table row selection
  // In this example, selected rows are tracked by the repo names from each row. This could be any unique identifier.
  // This is to prevent state from being based on row order index in case we later add sorting.
  const isRepoSelectable = (repo: Repository) => repo.name !== 'a'; // Arbitrary logic for this example
  const [selectedRepoNames, setSelectedRepoNames] = useState<string[]>([]);
  const setRepoSelected = (repo: Repository, isSelecting = true) =>
    setSelectedRepoNames((prevSelected) => {
      const otherSelectedRepoNames = prevSelected.filter((r) => r !== repo.name);
      return isSelecting && isRepoSelectable(repo) ? [...otherSelectedRepoNames, repo.name] : otherSelectedRepoNames;
    });
  const selectAllRepos = (isSelecting = true) =>
    setSelectedRepoNames(isSelecting ? filteredRepos.map((r) => r.name) : []); // Selecting all should only select all currently filtered rows
  const areAllReposSelected = selectedRepoNames.length === filteredRepos.length && filteredRepos.length > 0;
  const areSomeReposSelected = selectedRepoNames.length > 0;
  const isRepoSelected = (repo: Repository) => selectedRepoNames.includes(repo.name);

  // To allow shift+click to select/deselect multiple rows
  const [recentSelectedRowIndex, setRecentSelectedRowIndex] = useState<number | null>(null);
  const [shifting, setShifting] = useState(false);

  const onSelectRepo = (repo: Repository, rowIndex: number, isSelecting: boolean) => {
    // If the user is shift + selecting the checkboxes, then all intermediate checkboxes should be selected
    if (shifting && recentSelectedRowIndex !== null) {
      const numberSelected = rowIndex - recentSelectedRowIndex;
      const intermediateIndexes =
        numberSelected > 0
          ? Array.from(new Array(numberSelected + 1), (_x, i) => i + recentSelectedRowIndex)
          : Array.from(new Array(Math.abs(numberSelected) + 1), (_x, i) => i + rowIndex);
      intermediateIndexes.forEach((index) => setRepoSelected(repositories[index], isSelecting));
    } else {
      setRepoSelected(repo, isSelecting);
    }
    setRecentSelectedRowIndex(rowIndex);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShifting(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShifting(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // Set up bulk selection menu
  const bulkSelectMenuRef = useRef<HTMLDivElement>(null);
  const bulkSelectToggleRef = useRef<any>(null);
  const bulkSelectContainerRef = useRef<HTMLDivElement>(null);

  const [isBulkSelectOpen, setIsBulkSelectOpen] = useState<boolean>(false);

  const handleBulkSelectClickOutside = (event: MouseEvent) => {
    if (isBulkSelectOpen && !bulkSelectMenuRef.current?.contains(event.target as Node)) {
      setIsBulkSelectOpen(false);
    }
  };

  const handleBulkSelectMenuKeys = (event: KeyboardEvent) => {
    if (!isBulkSelectOpen) {
      return;
    }
    if (
      bulkSelectMenuRef.current?.contains(event.target as Node) ||
      bulkSelectToggleRef.current?.contains(event.target as Node)
    ) {
      if (event.key === 'Escape' || event.key === 'Tab') {
        setIsBulkSelectOpen(!isBulkSelectOpen);
        bulkSelectToggleRef.current?.querySelector('button').focus();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleBulkSelectMenuKeys);
    window.addEventListener('click', handleBulkSelectClickOutside);
    return () => {
      window.removeEventListener('keydown', handleBulkSelectMenuKeys);
      window.removeEventListener('click', handleBulkSelectClickOutside);
    };
  }, [isBulkSelectOpen, bulkSelectMenuRef]);

  const onBulkSelectToggleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation(); // Stop handleClickOutside from handling
    setTimeout(() => {
      if (bulkSelectMenuRef.current) {
        const firstElement = bulkSelectMenuRef.current.querySelector('li > button:not(:disabled)');
        firstElement && (firstElement as HTMLElement).focus();
      }
    }, 0);
    setIsBulkSelectOpen(!isBulkSelectOpen);
  };

  let menuToggleCheckmark: boolean | null = false;
  if (areAllReposSelected) {
    menuToggleCheckmark = true;
  } else if (areSomeReposSelected) {
    menuToggleCheckmark = null;
  }

  const bulkSelectToggle = (
    <MenuToggle
      ref={bulkSelectToggleRef}
      onClick={onBulkSelectToggleClick}
      isExpanded={isBulkSelectOpen}
      splitButtonItems={[
        <MenuToggleCheckbox
          id="same-select-group-input-bulk-select"
          key="same-select-group-input-bulk-select"
          aria-label="Select all"
          isChecked={menuToggleCheckmark}
          onChange={(checked, _event) => selectAllRepos(checked)}
        />
      ]}
      aria-label="Full table selection checkbox"
    />
  );

  const bulkSelectMenu = (
    <Menu
      id="same-select-group-input-bulk-select"
      ref={bulkSelectMenuRef}
      onSelect={(_ev, itemId) => {
        selectAllRepos(itemId === 1 || itemId === 2);
        setIsBulkSelectOpen(!isBulkSelectOpen);
        bulkSelectToggleRef.current?.querySelector('button').focus();
      }}
    >
      <MenuContent>
        <MenuList>
          <MenuItem itemId={0}>Select none (0 items)</MenuItem>
          <MenuItem itemId={1}>Select page ({repositories.length} items)</MenuItem>
          <MenuItem itemId={2}>Select all ({repositories.length} items)</MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );

  const toolbarBulkSelect = (
    <div ref={bulkSelectContainerRef}>
      <Popper
        trigger={bulkSelectToggle}
        triggerRef={bulkSelectToggleRef}
        popper={bulkSelectMenu}
        popperRef={bulkSelectMenuRef}
        appendTo={bulkSelectContainerRef.current || undefined}
        isVisible={isBulkSelectOpen}
      />
    </div>
  );

  // Set up status single select
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState<boolean>(false);
  const statusToggleRef = useRef<HTMLButtonElement>(null);
  const statusMenuRef = useRef<HTMLDivElement>(null);
  const statusContainerRef = useRef<HTMLDivElement>(null);

  const handleStatusMenuKeys = (event: KeyboardEvent) => {
    if (isStatusMenuOpen && statusMenuRef.current?.contains(event.target as Node)) {
      if (event.key === 'Escape' || event.key === 'Tab') {
        setIsStatusMenuOpen(!isStatusMenuOpen);
        statusToggleRef.current?.focus();
      }
    }
  };

  const handleStatusClickOutside = (event: MouseEvent) => {
    if (isStatusMenuOpen && !statusMenuRef.current?.contains(event.target as Node)) {
      setIsStatusMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleStatusMenuKeys);
    window.addEventListener('click', handleStatusClickOutside);
    return () => {
      window.removeEventListener('keydown', handleStatusMenuKeys);
      window.removeEventListener('click', handleStatusClickOutside);
    };
  }, [isStatusMenuOpen, statusMenuRef]);

  const onStatusToggleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation(); // Stop handleClickOutside from handling
    setTimeout(() => {
      if (statusMenuRef.current) {
        const firstElement = statusMenuRef.current.querySelector('li > button:not(:disabled)');
        firstElement && (firstElement as HTMLElement).focus();
      }
    }, 0);
    setIsStatusMenuOpen(!isStatusMenuOpen);
  };

  function onStatusSelect(event: React.MouseEvent | undefined, itemId: string | number | undefined) {
    if (typeof itemId === 'undefined') {
      return;
    }

    setStatusSelection(itemId.toString());
    setIsStatusMenuOpen(!isStatusMenuOpen);
  }

  const statusToggle = (
    <MenuToggle
      ref={statusToggleRef}
      onClick={onStatusToggleClick}
      isExpanded={isStatusMenuOpen}
      icon={<FilterIcon />}
      style={
        {
          width: '200px'
        } as React.CSSProperties
      }
    >
      {statusSelection}
    </MenuToggle>
  );

  const statusMenu = (
    <Menu ref={statusMenuRef} id="same-select-group-status-menu" onSelect={onStatusSelect} selected={statusSelection}>
      <MenuContent>
        <MenuList>
          <MenuItem itemId="All statuses">All statuses</MenuItem>
          <MenuItem itemId="Degraded">Degraded</MenuItem>
          <MenuItem itemId="Down">Down</MenuItem>
          <MenuItem itemId="Needs maintenance">Needs maintenance</MenuItem>
          <MenuItem itemId="Running">Running</MenuItem>
          <MenuItem itemId="Stopped">Stopped</MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );

  const statusSelect = (
    <div ref={statusContainerRef}>
      <Popper
        trigger={statusToggle}
        triggerRef={statusToggleRef}
        popper={statusMenu}
        popperRef={statusMenuRef}
        appendTo={statusContainerRef.current || undefined}
        isVisible={isStatusMenuOpen}
      />
    </div>
  );

  // Set up location checkbox select
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState<boolean>(false);
  const locationToggleRef = useRef<HTMLButtonElement>(null);
  const locationMenuRef = useRef<HTMLDivElement>(null);
  const locationContainerRef = useRef<HTMLDivElement>(null);

  const handleLocationMenuKeys = (event: KeyboardEvent) => {
    if (isLocationMenuOpen && locationMenuRef.current?.contains(event.target as Node)) {
      if (event.key === 'Escape' || event.key === 'Tab') {
        setIsLocationMenuOpen(!isLocationMenuOpen);
        locationToggleRef.current?.focus();
      }
    }
  };

  const handleLocationClickOutside = (event: MouseEvent) => {
    if (isLocationMenuOpen && !locationMenuRef.current?.contains(event.target as Node)) {
      setIsLocationMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleLocationMenuKeys);
    window.addEventListener('click', handleLocationClickOutside);
    return () => {
      window.removeEventListener('keydown', handleLocationMenuKeys);
      window.removeEventListener('click', handleLocationClickOutside);
    };
  }, [isLocationMenuOpen, locationMenuRef]);

  const onLocationMenuToggleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation(); // Stop handleClickOutside from handling
    setTimeout(() => {
      if (locationMenuRef.current) {
        const firstElement = locationMenuRef.current.querySelector('li > button:not(:disabled)');
        firstElement && (firstElement as HTMLElement).focus();
      }
    }, 0);
    setIsLocationMenuOpen(!isLocationMenuOpen);
  };

  function onLocationMenuSelect(event: React.MouseEvent | undefined, itemId: string | number | undefined) {
    if (typeof itemId === 'undefined') {
      return;
    }

    setLocationSelection(itemId.toString());
    setIsLocationMenuOpen(!isLocationMenuOpen);
  }

  const locationToggle = (
    <MenuToggle
      ref={locationToggleRef}
      onClick={onLocationMenuToggleClick}
      isExpanded={isLocationMenuOpen}
      icon={<FilterIcon />}
      style={
        {
          width: '200px'
        } as React.CSSProperties
      }
    >
      {locationSelection}
    </MenuToggle>
  );

  const locationMenu = (
    <Menu
      ref={locationMenuRef}
      id="same-select-group-location-menu"
      onSelect={onLocationMenuSelect}
      selected={locationSelection}
    >
      <MenuContent>
        <MenuList>
          <MenuItem itemId="All locations">All locations</MenuItem>
          <MenuItem itemId="Bangalore">Bangalore</MenuItem>
          <MenuItem itemId="Boston">Boston</MenuItem>
          <MenuItem itemId="Brno">Brno</MenuItem>
          <MenuItem itemId="Raleigh">Raleigh</MenuItem>
          <MenuItem itemId="Westford">Westford</MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );

  const locationSelect = (
    <div ref={locationContainerRef}>
      <Popper
        trigger={locationToggle}
        triggerRef={locationToggleRef}
        popper={locationMenu}
        popperRef={locationMenuRef}
        appendTo={locationContainerRef.current || undefined}
        isVisible={isLocationMenuOpen}
      />
    </div>
  );

  // Set up pagination and toolbar
  const toolbarPagination = (
    <Pagination
      titles={{ paginationAriaLabel: 'Same select group pagination' }}
      itemCount={repositories.length}
      perPage={10}
      page={1}
      widgetId="same-select-group-mock-pagination"
      isCompact
    />
  );

  const toolbar = (
    <Toolbar
      id="same-select-group-toolbar"
      clearAllFilters={() => {
        setStatusSelection('All statuses');
        setLocationSelection('All locations');
      }}
    >
      <ToolbarContent>
        <ToolbarItem>{toolbarBulkSelect}</ToolbarItem>
        <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
          <ToolbarItem>{statusSelect}</ToolbarItem>
          <ToolbarItem>{locationSelect}</ToolbarItem>
        </ToolbarToggleGroup>
        <ToolbarItem variant="pagination">{toolbarPagination}</ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  const emptyState = (
    <EmptyState headingLevel="h4" titleText="No results found" icon={SearchIcon}>
      <EmptyStateBody>No results match the filter criteria. Clear all filters and try again.</EmptyStateBody>
      <EmptyStateFooter>
        <EmptyStateActions>
          <Button
            variant="link"
            onClick={() => {
              setStatusSelection('All statuses');
              setLocationSelection('All locations');
            }}
          >
            Clear all filters
          </Button>
        </EmptyStateActions>
      </EmptyStateFooter>
    </EmptyState>
  );

  return (
    <Fragment>
      {toolbar}
      <Table aria-label="Selectable table">
        <Thead>
          <Tr>
            <Th screenReaderText="Row select" />
            <Th width={20}>{columnNames.name}</Th>
            <Th width={10}>{columnNames.threads}</Th>
            <Th width={10}>{columnNames.apps}</Th>
            <Th width={10}>{columnNames.workspaces}</Th>
            <Th width={20}>{columnNames.status}</Th>
            <Th width={20}>{columnNames.location}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredRepos.length > 0 &&
            filteredRepos.map((repo, rowIndex) => (
              <Tr key={repo.name}>
                <Td
                  select={{
                    rowIndex,
                    onSelect: (_event, isSelecting) => onSelectRepo(repo, rowIndex, isSelecting),
                    isSelected: isRepoSelected(repo),
                    isDisabled: !isRepoSelectable(repo)
                  }}
                />
                <Td dataLabel={columnNames.name} modifier="truncate">
                  {repo.name}
                </Td>
                <Td dataLabel={columnNames.threads} modifier="truncate">
                  {repo.threads}
                </Td>
                <Td dataLabel={columnNames.apps} modifier="truncate">
                  {repo.apps}
                </Td>
                <Td dataLabel={columnNames.workspaces} modifier="truncate">
                  {repo.workspaces}
                </Td>
                <Td dataLabel={columnNames.status} modifier="truncate">
                  {repo.status}
                </Td>
                <Td dataLabel={columnNames.location} modifier="truncate">
                  {repo.location}
                </Td>
              </Tr>
            ))}
          {filteredRepos.length === 0 && (
            <Tr>
              <Td colSpan={8}>
                <Bullseye>{emptyState}</Bullseye>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Fragment>
  );
};
