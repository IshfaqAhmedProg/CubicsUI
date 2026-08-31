import { Button, Card, Select } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<Select/>"}</code>
      </h1>
      <h2>Labels</h2>
      <section>
        <div className={"column"}>
          <h3>
            <code>{"<Select/>"}</code> with label
          </h3>
          <Select label="Choose your country">
            <option value="">Select an option</option>
            <option value="us">United States</option>
            <option value="in">India</option>
            <option value="de">Germany</option>
          </Select>
          <Select label="This is a really long label, a really really long label">
            <option value="">Select an option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </Select>
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            A required <code>{"<Select/>"}</code>
          </h3>
          <Select required label="Choose your country">
            <option value="">Select an option</option>
            <option value="us">United States</option>
            <option value="in">India</option>
          </Select>
        </div>
      </section>

      <h2>Sizes</h2>
      <section>
        <Select label="Extra Small" size="xs">
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
        <Select label="Small" size="sm">
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
        <Select label="Medium" size="md">
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
        <Select label="Large" size="lg">
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
        <Select label="Extra Large" size="xl">
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
      </section>

      <h2>Background Check</h2>
      <section>
        <h3>On Card</h3>
        <Card className={"column"}>
          <Select label="On top of a card">
            <option value="">Select an option</option>
            <option value="1">Option 1</option>
          </Select>
        </Card>
        <h3>On RGB</h3>
        <div className={"column rgb_bg"}>
          <Select label="On top of rgb colors">
            <option value="">Select an option</option>
            <option value="1">Option 1</option>
          </Select>
        </div>
        <h3>On Image</h3>
        <div className={"column image_bg"}>
          <Select label="On top of image">
            <option value="">Select an option</option>
            <option value="1">Option 1</option>
          </Select>
        </div>
      </section>

      <h2>Helper Text</h2>
      <section>
        <div className={"column"}>
          <h3>Normal Helper text</h3>
          <Select
            label="Select your country"
            helperText="This determines your shipping options"
          >
            <option value="">Select an option</option>
            <option value="us">United States</option>
            <option value="in">India</option>
          </Select>
          <Select
            label="Select with multiple helper texts"
            helperText={["Do this", "and then that"]}
          >
            <option value="">Select an option</option>
            <option value="1">Option 1</option>
          </Select>
        </div>
        <hr />
        <div className={"column"}>
          <h3>When Errored</h3>
          <Select
            label="Errored Select"
            error="Make sure to check the Select here"
          >
            <option value="">Select an option</option>
            <option value="1">Option 1</option>
          </Select>
          <Select
            label="Errored Select with multiple errors"
            error={["This select has", "multiple errors"]}
          >
            <option value="">Select an option</option>
            <option value="1">Option 1</option>
          </Select>
        </div>
      </section>

      <h2>
        With <code>fullWidth</code>
      </h2>
      <section>
        <Select label="Select with fullWidth" fullWidth>
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
        <Select
          label="Select with fullWidth and helper text"
          fullWidth
          helperText={["This is helper text"]}
        >
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
        <Select
          startAdornment={<CubicsUIFavicon />}
          endAdornment={<CubicsUIFavicon />}
          label="Select with fullWidth and icons"
          fullWidth
        >
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
      </section>

      <h2>
        With <code>disablePadding</code>
      </h2>
      <section>
        <p>
          Use to remove the padding of the inputWrapper, mainly used when using{" "}
          <code>{"<Button/>"}</code> for start or end icons
        </p>
        <Select disablePadding label="Without icon is not supposed to be used">
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
        <Select
          label="Normal Icon Without disable padding"
          startAdornment={<CubicsUIFavicon />}
        >
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
        <Select
          label="Button Icon Without disable padding"
          startAdornment={
            <Button icon>
              <CubicsUIFavicon />
            </Button>
          }
        >
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>

        <Select
          disablePadding
          label="Button Start Icon with disable padding"
          startAdornment={
            <Button icon>
              <CubicsUIFavicon />
            </Button>
          }
        >
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
        <Select
          disablePadding
          label="Button End Icon with disable padding"
          endAdornment={
            <Button variant="outlined" icon>
              <CubicsUIFavicon />
            </Button>
          }
        >
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
        <Select
          disablePadding
          label="Button Both Icons with disable padding"
          startAdornment={
            <Button variant="contained" icon>
              <CubicsUIFavicon />
            </Button>
          }
          endAdornment={
            <Button variant="contained" icon>
              <CubicsUIFavicon />
            </Button>
          }
        >
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
      </section>

      <h2>Width based on longest option</h2>
      <section>
        <p>
          Native <code>{"<select/>"}</code> sizes itself to fit its widest
          option.
        </p>
        <Select label="Pick a plan">
          <option value="">Select an option</option>
          <option value="basic">Basic</option>
          <option value="pro">Pro</option>
          <option value="enterprise">
            Enterprise Plan For Extremely Large Organizations With Thousands Of
            Employees And Very Specific Compliance Requirements Including SOC2
            HIPAA And GDPR
          </option>
        </Select>
        <Select label="Pick a plan (fullWidth)" fullWidth>
          <option value="">Select an option</option>
          <option value="basic">Basic</option>
          <option value="pro">Pro</option>
          <option value="enterprise">
            Enterprise Plan For Extremely Large Organizations With Thousands Of
            Employees And Very Specific Compliance Requirements Including SOC2
            HIPAA And GDPR
          </option>
        </Select>
      </section>

      <h2>
        With <code>multiple</code>
      </h2>
      <section>
        <p>
          Native multiple select, users select using Ctrl/Cmd + click. For a
          better multiselect UX use <code>{"<ComboBox/>"}</code> instead.
        </p>
        <Select label="Multiple Select" multiple htmlSize={4}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </Select>
      </section>

      <h2>With optgroups</h2>
      <section>
        <Select label="Select a fruit or vegetable">
          <option value="">Select an option</option>
          <optgroup label="Fruits">
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
          </optgroup>
          <optgroup label="Vegetables">
            <option value="carrot">Carrot</option>
            <option value="potato">Potato</option>
          </optgroup>
        </Select>
      </section>

      <h2>Disabled Select</h2>
      <section>
        <Select label="Disabled Select" disabled>
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
        <Select label="Enabled Select">
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
        </Select>
        <Select
          label="Disabled Select with default value"
          defaultValue="1"
          disabled
        >
          <option value="1">This is disabled</option>
          <option value="2">Option 2</option>
        </Select>
        <Select label="Select with a disabled option">
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
          <option value="2" disabled>
            Option 2 (disabled)
          </option>
        </Select>
      </section>
    </main>
  );
}
