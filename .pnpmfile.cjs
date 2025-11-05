/**
 * TEMPORARY WORKAROUND for @hookform/resolvers not declaring zod as a dependency
 *
 * This file forces zod into @hookform/resolvers' dependencies to fix module resolution
 * errors when using zod v4 with @hookform/resolvers v5.2.0+
 *
 * Related issue: https://github.com/react-hook-form/resolvers/issues/818
 *
 * TODO: Remove this file once @hookform/resolvers properly declares zod as a peer/direct dependency
 */

function readPackage(pkg) {
  if (pkg.name === "@hookform/resolvers") {
    pkg.dependencies = {
      ...pkg.dependencies,
      zod: "^4.0.0",
    };
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
