/**
 * 创建BEM命名空间
 * @param prefixedName 前缀名称
 * @param blockSuffix 块后缀
 * @param element 元素
 * @param modifier 修饰符
 * @returns 命名空间
 */
function _bem(
  prefixedName: string,
  blockSuffix: string,
  element: string,
  modifier: string
) {
  if (blockSuffix) {
    prefixedName += `-${blockSuffix}`;
  }

  if (element) {
    prefixedName += `__${element}`;
  }

  if (modifier) {
    prefixedName += `--${modifier}`;
  }

  return prefixedName;
}

/**
 * 创建命名空间
 * @param prefixName 前缀名称
 * @returns 命名空间
 */
function createBEM(prefixName: string) {
  const b = (blockSuffix: string = "") => _bem(prefixName, blockSuffix, "", "");
  const e = (element: string = "") =>
    element ? _bem(prefixName, "", element, "") : "";
  const m = (modifier: string = "") =>
    modifier ? _bem(prefixName, "", "", modifier) : "";

  const be = (blockSuffix: string = "", element: string = "") =>
    blockSuffix && element ? _bem(prefixName, blockSuffix, element, "") : "";
  const bm = (blockSuffix: string = "", modifier: string = "") =>
    blockSuffix && modifier ? _bem(prefixName, blockSuffix, "", modifier) : "";
  const em = (element: string = "", modifier: string = "") =>
    element && modifier ? _bem(prefixName, "", element, modifier) : "";

  const bem = (
    blockSuffix: string = "",
    element: string = "",
    modifier: string = ""
  ) =>
    blockSuffix && element && modifier
      ? _bem(prefixName, blockSuffix, element, modifier)
      : "";

  const is = (name: string, state: boolean | string) =>
    state ? `is-${name}` : "";

  return {
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is,
  };
}

export function createNamespace(name: string) {
  const prefixedName = `titans-${name}`;
  return createBEM(prefixedName);
}
