function reduceById<T extends Readonly<{ id: string }[]>>(arr: T) {
  return arr.reduce((acc, doc) => {
    acc[doc.id as T[number]['id']] = doc;
    return acc;
  }, {} as Record<T[number]['id'], T[number]>);
}

export default reduceById;
