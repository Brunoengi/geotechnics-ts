<h1>Geotechnics</h1>

<p>This repository aims to automate geotechnical tests to obtain soil parameters and dimensioning of foundations according to NBR-6122, NBR 12069 and NBR 6484 <p>

<h2>Sumary:</h2>
<p>
  <ol>
    <li>Geotchnical referece</li>
    <li>File System</li>
    <li>Examples</li>
  </ol>
</p>

<h2>Examples</h2>

<p>All examples are in the project, in other words, the final archive can be acessed in project.</p>

<h3>Example 1:</h3>

<p>In this example, our objective is calculate the soil resistence to deep foundations based in SPT - Standard Penetration Test with a continuous flight auger (CFA) pile</p>

<p>The first stap is create a instace about SPT, in this case we use this data:</p>


| Soil Quota  | NSPT  | type Soil  |
| :---:       | :---: | :---:      |
| 1           | 12    | silty sand |
| 2           | 12    | silty sand |
| 3           | 15    | silty sand |
| 4           | 16    | silty sand |
| 5           | 15    | silty sand |
| 6           | 17    | silty sand |
| 8           | 19    | silty sand |
| 9           | 21    | silty sand |
| 11          | 23    | silty sand |
| 12          | 6     | silty clay |
| 13          | 6     | silty clay |
| 14          | 9     | silty clay |
| 15          | 10    | silty clay |
| 16          | 5     | silty clay |
| 17          | 6     | silty clay |
| 18          | 5     | silty clay |
| 19          | 5     | silty clay |
| 20          | 4     | silty clay |

<p>Other necessary information is the water Level, in this case the water level is 1 meter.</p>

<p>To representate this SPT test, you need to create a instance to SPT class:</p>

```
const mySPT = new SPT([
  {NSPT: 12, typeSoil: 'SM'},
  {NSPT: 12, typeSoil: 'SM'},
  {NSPT: 15, typeSoil: 'SM'},
  {NSPT: 16, typeSoil: 'SM'},
  {NSPT: 15, typeSoil: 'SM'},
  {NSPT: 17, typeSoil: 'SM'},
  {NSPT: 19, typeSoil: 'SM'},
  {NSPT: 21, typeSoil: 'SM'},
  {NSPT: 23, typeSoil: 'SM'},
  {NSPT: 6, typeSoil: 'CM'},
  {NSPT: 6, typeSoil: 'CM'},
  {NSPT: 9, typeSoil: 'CM'},
  {NSPT: 10, typeSoil: 'CM'},
  {NSPT: 5, typeSoil: 'CM'},
  {NSPT: 6, typeSoil: 'CM'},
  {NSPT: 5, typeSoil: 'CM'},
  {NSPT: 5, typeSoil: 'CM'},
  {NSPT: 4, typeSoil: 'CM'}
], {
  inicialQuota: 1,
  waterLevel: 1,
  })
```

<p>The next step is create a class to soil parameters, in this case we have 3 possible author to set the properties KAv and AlfaAv (Av: Aoki Velloso), the fist possibility is the original parameters (1975) (author = 0), the second possibility is Daziger e Velloso (1986) e Laprovitera (1988) (author = 1), and the third possibility is Monteiro (1997) (author = 2)
In this case, we area using Monteiro (1997), author = 2. The instante is shown below, in this case we use a create method because the class use asynchronous method:</p>

```
const soilParams = await SoilParams.create(mySPT, {
  author: 2
})
```

<p>The next step is create a class to define stake parameters, It's necessery to insert a object with numberAuthor and numberType key, the first is a referente to 3 possibilities author to calculate F1 e F2 parameters, in this case we are using Monteiro (1997) and numberType is a reference to stake type, in this case is a a continuous flight auger (CFA) pile.</p>

```
const myStake = await StakeParams.create({
  numberAuthor: 3,
  numberType: 9
})
```

<p>Next Step is to define the stake Section, in this case we are using circular section, with diameter = 0.3 meters, height = 4 meters, and inicial quota = 1, in other words, the stake base quota is 5 meters (4 more 1).</p>

```
const stakeSection = new CircularStake({
  diameter: 0.3,
  height: 4,
  inicialQuota: 1
})
```

<p>The final step is create a class to calculate the soil resistence, the intance receives 3 parameters, the first is the stake section, the second is the soil parameters and the thrst is the stake properties.</p>

```
const mySoilResistence = new SoilResistence(stakeSection, soilParams, myStake)
```

<p>Now, you can use de properties of class SoilResistence.</p>

