function HashMap() {
  let capacity = 16;
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
    const node = Node(key, value);

    //if k already present, overwrite old value with v
  }

  function getBucket(key) {
    const hashKey = hash(key);
    const bucket = buckets[hashKey];
    return bucket;
  }

  function get(key) {
    const bucket = getBucket(key);
    const node = bucket.find(key);
    const value = node.value;

    return value;
  }

  function has(key) {
    const bucket = getBucket(key);
    const node = bucket.find(key);
    if (node.value) {
      return true;
    } else {
      return false;
    }
  }

  function remove(key) {
    const bucket = getBucket(key);
    const isRemoved = bucket.remove(key);

    return isRemoved;
  }

  function length() {
    let length = 0;
    buckets.forEach((bucket) => {
      const size = bucket.size();
      length += size;
    });

    return length;
  }

  function clear() {
    buckets.length = 0;
  }

  function keys() {
    //returns an array containing all the keys inside the hash map.
  }

  function values() {
    //returns an array containing all the values.
  }

  function entries() {
    /*
        returns an array that contains each key, value pair. 
        `Example: [[firstKey, firstValue], [secondKey, secondValue]]
        */
  }

  return { hash };
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

  return { size, append, remove, overwrite, find };
}

function Node(key, value, next = null) {
  return {
    key,
    value,
    next,
  };
}

const map = HashMap();
