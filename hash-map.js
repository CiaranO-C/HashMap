function HashMap() {
  let capacity = 16;
  let size = 0;
  const loadFactor = 0.75;
  const buckets = [];

  function hash(key) {
    let hashCode = 0;

    const primeNum = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNum * hashCode + key.charCodeAt(i);
      hashCode = hashCode % 16;
    }
    return hashCode;
  }

  function set(key, value) {
    const hashKey = hash(key);
    if (!buckets[hashKey]) {
      buckets[hashKey] = LinkedList();
      buckets[hashKey].append(key, value);
      size++;
    } else if (has(key)) {
      buckets[hashKey].overwrite(key, value);
    } else {
      buckets[hashKey].append(key, value);
      size++;
    }
  }

  function getBucket(key) {
    const hashKey = hash(key);
    const bucket = buckets[hashKey] || null;
    if (bucket === null) console.error("Bucket empty!");

    return bucket;
  }

  function get(key) {
    const bucket = getBucket(key);
    if (!bucket) return null;

    const node = bucket.find(key);
    const value = node.value;

    return value;
  }

  function has(key) {
    const bucket = getBucket(key);

    const node = bucket.find(key);
    if (node) {
      return true;
    } else {
      return false;
    }
  }

  function remove(key) {
    const bucket = getBucket(key);
    if (!bucket) return null;
    const isRemoved = bucket.remove(key);

    return isRemoved;
  }

  function length() {
    /*let length = 0;
    buckets.forEach((bucket) => {
      const size = bucket.size();
      length += size;
    });
*/
    return size;
  }

  function clear() {
    buckets.length = 0;
  }

  function keys() {
    let keys = null;
    buckets.forEach((bucket) => {
      const keyArray = bucket.collate("key");
      if (!keys) {
        keys = keyArray;
      } else {
        keys = keys.concat(keyArray);
      }
    });
    return keys;
  }

  function values() {
    let values = null;
    buckets.forEach((bucket) => {
      const valueArray = bucket.collate("value");
      if (!values) {
        values = valueArray;
      } else {
        values = values.concat(valueArray);
      }
    });
    return values;
  }

  function pairs() {
    let pairs = null;
    buckets.forEach((bucket) => {
      const pairArray = bucket.collate();
      if (!pairs) {
        pairs = pairArray;
      } else {
        pairs = pairs.concat(pairArray);
      }
    });
    return pairs;
  }

  function arr(){
    console.log(buckets);
  }

  return { set, get, remove, length, clear, keys, values, pairs, arr };
}

function LinkedList() {
  let length = 0;
  let head = null;

  function size() {
    return length;
  }

  function append(key, value) {
    const node = Node(key, value);
    if (head === null) {
      head = node;
    } else {
      let currentNode = head;
      while (currentNode.next != null) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }
    length++;
  }

  function remove(key) {
    let previousNode = null;
    let currentNode = head;
    while (currentNode.key != key && currentNode != null) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    if (currentNode === null) {
      console.error("key does not exist");
      return false;
    } else if (currentNode === head) {
      head = head.next;
    } else {
      previousNode.next = currentNode.next;
    }
    length--;
    return true;
  }

  function overwrite(key, value) {
    const node = find(key);
    node.value = value;
  }

  function find(key) {
    let currentNode = head;
    while (currentNode.key != key && currentNode != null) {
      currentNode = currentNode.next;
    }
    if (currentNode === null) {
      console.error("key was not found");
      return null;
    }
    return currentNode;
  }

  function collate(property) {
    const properties = [];
    let currentNode = head;
    while (currentNode != null) {
      if (!property) {
        properties.push([currentNode.key, currentNode.value]);
      } else {
        properties.push(currentNode[property]);
      }
      currentNode = currentNode.next;
    }
    return properties;
  }

  return { size, append, remove, overwrite, find, collate };
}

function Node(key, value, next = null) {
  return {
    key,
    value,
    next,
  };
}

const map = HashMap();
map.set('one', 1);
map.set('two', 2);
console.log(map.pairs());
console.log(map.keys());
console.log(map.values());
console.log(map.length());