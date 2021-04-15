const asyncComponent = {
  coustomer: {
    list: 'productionlist',
    add: 'productionadd',
    edit: 'productionedit',
  },
  admin: {
    list: 'productionlist',
    add: 'productionadd',
    edit: 'productionedit',
    category: 'categoryadd',
  },
};
export default function getAsyncRoute(role, asyncRoute) {
  const asyncNameLists = Object.values(asyncComponent[role]);
  const asyncRouteChildrenResults = asyncRoute.children.filter((ele) => {
    const eachName = ele.name.toLowerCase();
    if (asyncNameLists.includes(eachName)) {
      return true;
    }
    return false;
  });
  return {
    ...asyncRoute,
    children: asyncRouteChildrenResults,
  };
}
