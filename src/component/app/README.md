# App
Contains the components re-used by deiffernt components on the **PAAS UI** application.

These components are very essential to the application because they are the core components that the app is heavily dependent on.

The Core Components are:
- AppCard
- AppLink
- AppTableFooter
- AppTable

    ## AppCard
    Used in place of a card for the Application. This components comes with shadow, border radius

    This component props are:
    - Topic : string | JSX.Element | JSX.Element[]
        
        Means it accepts a string or a JSX Element or an array of JSX Elements depending on how you want the topic to be displayed on the card
    - children: JSX.Element | JSX.Element[]

        You cend the content of the card in here as an array of JSX elements of a single node of JSX element.

        ### Implementation

        ```html
            <AppCard topic={<Text variant="card-header" What is our service"</Text>}>
                {!loading.isLoading ?
                    <>
                    {stats?.map((x, i) => <Stat key={i} {...x} />)}
                    </> :
                    <SkeletonLoader rows={1} columns={2} width="200px" height="200px" />
                }
            </AppCard>
        ```

    ## AppLink
    Serves as replacement for Anchor tag
    
    ```html
        <a></a>
    ```
    The AppLink Component is a forwaref Component. It can take in as much as component props needed for the Links tags in there.

        ### implementation
         
        ```html
            <AppLink href={links.login} color="brand.primary-blue" >Back to Login</AppLink>
       ```

    ## AppTableFooter
    Only  current used in AppTable component. It works alongside with the Paginator context of **React.Context**. Though this component can be used for any pagintion implementation.

    It is responsible for going to the next page and previous page. it consists of buttons that have the:
    - First
    - Previous
    - Next
    - and Last buttons

    ## AppTable
    One of the most used components on the **Pass UI** application. It is a robust component that App folder. it component props are:
    - columns: Column[]

        it's of type Column as defined in the Models folder. You get to set the columns that the table would use. Column Model is defined as :
        - name: string

            The dislay name to appear on the column
        - key: string

            The key used to access the data coming from the API
        - ele?:string

            This is indicates if som cell should render special html deifined in AppTableElements enum
        - prefix?:string,

            This is an optional property. prefix as it's name implies is to prefix any string with the value attached under that specific column
        - suffix?:string

            This is an optional property. suffix as it's name implies is to add a suffix to any string with the value attached under that specific column
        - lookUp?:Record<string, any>

            Look up refers to basic values that can be easily mapped. Values like ["Approved", "disapproved"] or ["Active", "Not active"] etc... This is used because some values from the API come as numbers which can be easily mapped as to make it equivalent array index correspond to it's value.
    - rows: T[],

        This ss the data coming from the API which is a generic type. 
    - actions?: Action[]

        Actions refer to the column responsbile for events to occur on the table. Mostly click actions. The type is of Action as defined below:
        - name: string

            The name to appear on the action
        - method: performAction,
            The function that performs the action
        - bgColor?: string,
            The background color of the action
        - color?:string,
            the text color to appear
        - showTextOnly?: boolean,
            
            ???
        - ele?: string

            The element to represent it as
    - showNumbering?: boolean,

        A toggle property To indicate numbering on the table of not
    - showAllAction?: boolean

        To toggle if an elipse should appear to view more actions

        ## Implemenation
        