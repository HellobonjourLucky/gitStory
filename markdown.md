<!-- ^ shift v -->

<!-- Heading -->
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6


<!-- Making line -->
___

#### Basic syntax for Git
git [link](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)


<!-- Making line -->
___

<!-- Text attributes -->
*italic* 
**bold**
~~strikethrough~~

Lorem ipsum dolor **bold** amet, consectetur adipisicing elit, sed do eiusmod *italic* tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in ~~voluptate~~ velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


<!-- Quote -->
> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<!-- Bullet List -->
Fruits:
* Apple
* Banana

Other Fruits:
- Kiwi
- Mango

Supermarkets:
1. AH
2. JUMBO

<!-- Link -->
Naver [here](http://naver.com)

<!-- Image -->
![Image description](https://images4.persgroep.net/rcs/vuMtdtySj6XsIVx0BD10G5Rxm2g/diocontent/48563309/_fitwidth/1400?appId=038a353bad43ac27fd436dc5419c256b&quality=0.8)


<!-- Table -->
<!--   |--:|--:|     오른쪽 정렬-->
<!--   |:--|:--|     왼쪽 정렬 -->
<!--   |:--:|:--:|   중앙 정렬 -->

|Name|Profession|
|--|--| 
|KIM|student|
|Lee|guide|


<!-- Code -->
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex `console.log("this is code");`ea commodo consequat.

```js
exports.getDate = function(){
  let today = new Date();
  let option = {
    weekend : 'long',
    day: 'numeric',
    month: 'long'
  };
  let day = today.toLocaleDateString('en-US', option);

  return day;
}
```