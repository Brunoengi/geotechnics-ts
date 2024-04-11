<h1>Geotechnics</h1>

<p>This repository aims to automate geotechnical tests to obtain soil parameters and dimensioning of foundations according to NBR-6122, NBR-12069 and NBR-6484. <p>

<h2>Sumary:</h2>
<p>
  <ol>
    <li><a href='#able-to-do'>What are you able to do</a></li>
    <li><a href='#geotchnical-reference'>Geotchnical Reference</a></li>
    <li><a href='#file-system'>File System</a></li>
    <li><a href='#examples'>Examples</a></li>
    <li><a href='#authors'>Authors</a></li>
  </ol>
</p>

<h2 id='able-to-do'>1. What are you able to do</h2>

<p>The following geotechnical tests have already been automated:</p>


| Geotechnical Tests              | 
| :---:                           | 
| SPT - Standard Penetration Test | 
| CPT - Cone Penetration Test     | 


<p>With this tests, you can calculate the soil resistence to deep fundations, you can calculate the side resistence and base resistence based based on Aoki Velloso's method with contribuitions from Danziger e Velloso (1986), Monteiro (1997), Laprovitera (1988) and Benegas (1993).</p>

| Method to calculate soil resistence| 
| :---:            | 
| Aoki and Velloso |

<p>Furthermore, there are classes in the application to calculate the geometric properties of foundations, so far only solid foundations but soon we will have hollow foundation projects.</p>

| Stake geometric properties| 
| :---:               | 
| Circular - Solid    |
| Rectangular - Solid |

<h2 id='geotchnical-reference'>2. Geotechnical Reference</a></h2>

<h2 id='file-system'>3. File System</h2>

```
├── dist
│ ├── ...
├── src
│ ├── examples
│ | ├── example1.ts
│ ├── geotechnical
│ ├── interface
│ ├── json
│ └── utils
├── README.md
├── LICENCE.md
├── tsconfig.json
```

<p>
<b>dist:</b> Folder of files compiled for javascript in the same structure as the src folder. </br></br>
<b>src:</b> Main project development folder developed with typescript, includes the examples folder that are presented in this documentation, geotechnical folder, interface, json file that includes information on current standards, utility folder with classes to access json files and class directing the paths from the project.
</p>

<h2 id='examples'>4. Examples</h2>

<p>All examples are in the project, in other words, the final archive can be acessed in project.</p>

<h3>Example 1:</h3>

<p>In this example, our objective is calculate the soil resistence to deep foundations based in SPT - Standard Penetration Test with a continuous flight auger (CFA) pile.</p>

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

<p>The final step is create a class to calculate the soil resistence, the intance receives 3 parameters, the first is the stake section, the second is the soil parameters and the thrst is the stake properties that includes lateral resistance and base resistance.</p>

```
const mySoilResistence = new SoilResistence(stakeSection, soilParams, myStake)
```

<p>Now, you can use properties that include lateral resistance based on distance from the SPT or CPT test and base resistance. </p>

<h2 id='authors'>5. Authors</h2>

<h4>Developer: Eng. Bruno Teixeira Santos</h4>
<p>Redes Sociais:</p>
<a href="https://github.com/Brunoengi">Github:</a> <br>
<a href="https://www.linkedin.com/in/bruno--teixeira/">Linkedin:</a> <br>
<a href="https://www.instagram.com/b.de_bruno/">Instagram:</a> <br>
<a href="https://www.youtube.com/channel/UCini8PeSegCCvsCuzZCfKKA">Youtube:</a> <br>
</p>