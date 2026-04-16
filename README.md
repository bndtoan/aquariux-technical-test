# aquariux-technical-test

#### Runtime env:
- React Native 0.83.2
- Node.js 24.14.1
- JVM 17

#### Assumptions/Note:
- All optional tasks are completed

##### Logic
- Home: When "Popularity" category is selected, the moviedb api is already soting according to popularity, so "Sort by" option will not be applied
- Watch list: Member's join date is not exposed in the api so it can not be displayed.

##### UI/UX
- Home: Search button is only enabled when search field is not empty
- Details: "Add to Watchlist" button will become "Remove from Watchlist" if movie is already added. Colors is also inverted.
